/**#nocode+*/

'use strict';

//
// Date
// ====
//
(function() {
  // ES5 15.9.5.43
  // http://es5.github.com/#x15.9.5.43
  // This function returns a String value represent the instance in time
  // represented by this Date object. The format of the String is the Date Time
  // string format defined in 15.9.1.15. All fields are present in the String.
  // The time zone is always UTC, denoted by the suffix Z. If the time value of
  // this object is not a finite Number a RangeError exception is thrown.
  if (!Date.prototype.toISOString || (new Date(-62198755200000).toISOString().indexOf('-000001') === -1))
    Date.prototype.toISOString = function toISOString() {
      var result, length, value, year;
      if (!isFinite(this)) {
        throw new RangeError('Date.prototype.toISOString called on non-finite value.');
      }

      // the date time string format is specified in 15.9.1.15.
      result = [this.getUTCMonth() + 1, this.getUTCDate(),
            this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()];
      year = this.getUTCFullYear();
      year = (year < 0 ? '-' : (year > 9999 ? '+' : '')) +
          ('00000' + Math.abs(year)).slice(0 <= year && year <= 9999 ? -4 : -6);

      length = result.length;
      while (length--) {
        value = result[length];
        // pad months, days, hours, minutes, and seconds to have two digits.
        if (value < 10) {
          result[length] = '0' + value;
        }
      }
      // pad milliseconds to have three digits.
      return year + '-' + result.slice(0, 2).join('-') + 'T' + result.slice(2).join(':') + '.' +
          ('000' + this.getUTCMilliseconds()).slice(-3) + 'Z';
    }

    // ES5 15.9.4.4
    // http://es5.github.com/#x15.9.4.4
    if (!Date.now)
      Date.now = function now() {
        return new Date().getTime();
      };

    // ES5 15.9.5.44
    // http://es5.github.com/#x15.9.5.44
    // This function provides a String representation of a Date object for use by
    // JSON.stringify (15.12.3).
    if (!Date.prototype.toJSON)
      Date.prototype.toJSON = function toJSON(key) {
        // When the toJSON method is called with argument key, the following
        // steps are taken:

        // 1.  Let O be the result of calling ToObject, giving it the this
        // value as its argument.
        // 2. Let tv be ToPrimitive(O, hint Number).
        // 3. If tv is a Number and is not finite, return null.
        // XXX
        // 4. Let toISO be the result of calling the [[Get]] internal method of
        // O with argument "toISOString".
        // 5. If IsCallable(toISO) is false, throw a TypeError exception.
        if (typeof this.toISOString != 'function') {
          throw new TypeError('toISOString property is not callable');
        }
        // 6. Return the result of calling the [[Call]] internal method of
        //  toISO with O as the this value and an empty argument list.
        return this.toISOString();

        // NOTE 1 The argument is ignored.

        // NOTE 2 The toJSON function is intentionally generic; it does not
        // require that its this value be a Date object. Therefore, it can be
        // transferred to other kinds of objects for use as a method. However,
        // it does require that any such object have a toISOString method. An
        // object is free to use the argument key to filter its
        // stringification.
      };

    // ES5 15.9.4.2
    // http://es5.github.com/#x15.9.4.2
    // based on work shared by Daniel Friesen (dantman)
    // http://gist.github.com/303249
    if (!Date.parse || Date.parse('+275760-09-13T00:00:00.000Z') !== 8.64e15)
      // XXX global assignment won't work in embeddings that use
      // an alternate object for the context.
      Date = (function(NativeDate) {

        // Date.length === 7
        var Date = function Date(Y, M, D, h, m, s, ms) {
          var length = arguments.length;
          if (this instanceof NativeDate) {
            var date = length == 1 && String(Y) === Y ? // isString(Y)
                    // We explicitly pass it through parse:
                    new NativeDate(Date.parse(Y)) :
                    // We have to manually make calls depending on argument
                    // length here
                    length >= 7 ? new NativeDate(Y, M, D, h, m, s, ms) :
                    length >= 6 ? new NativeDate(Y, M, D, h, m, s) :
                    length >= 5 ? new NativeDate(Y, M, D, h, m) :
                    length >= 4 ? new NativeDate(Y, M, D, h) :
                    length >= 3 ? new NativeDate(Y, M, D) :
                    length >= 2 ? new NativeDate(Y, M) :
                    length >= 1 ? new NativeDate(Y) :
                                  new NativeDate();
            // Prevent mixups with unfixed Date object
            date.constructor = Date;
            return date;
          }
          return NativeDate.apply(this, arguments);
        };

        // 15.9.1.15 Date Time String Format.
        var isoDateExpression = new RegExp('^' +
            '(\\d{4}|[\+\-]\\d{6})' + // four-digit year capture or sign + 6-digit extended year
            '(?:-(\\d{2})' + // optional month capture
            '(?:-(\\d{2})' + // optional day capture
            '(?:' + // capture hours:minutes:seconds.milliseconds
                'T(\\d{2})' + // hours capture
                ':(\\d{2})' + // minutes capture
                '(?:' + // optional :seconds.milliseconds
                    ':(\\d{2})' + // seconds capture
                    '(?:\\.(\\d{3}))?' + // milliseconds capture
                ')?' +
            '(?:' + // capture UTC offset component
                'Z|' + // UTC capture
                '(?:' + // offset specifier +/-hours:minutes
                    '([-+])' + // sign capture
                    '(\\d{2})' + // hours offset capture
                    ':(\\d{2})' + // minutes offset capture
                ')' +
            ')?)?)?)?' +
            '$');

        // Copy any custom methods a 3rd party library may have added
        for (var key in NativeDate) {
          Date[key] = NativeDate[key];
        }

        // Copy "native" methods explicitly; they may be non-enumerable
        Date.now = NativeDate.now;
        Date.UTC = NativeDate.UTC;
        Date.prototype = NativeDate.prototype;
        Date.prototype.constructor = Date;

        // Upgrade Date.parse to handle simplified ISO 8601 strings
        Date.parse = function parse(string) {
          var match = isoDateExpression.exec(string);
          if (match) {
            match.shift(); // kill match[0], the full match
            // parse months, days, hours, minutes, seconds, and milliseconds
            for (var i = 1; i < 7; i++) {
              // provide default values if necessary
              match[i] = +(match[i] || (i < 3 ? 1 : 0));
              // match[1] is the month. Months are 0-11 in JavaScript
              // `Date` objects, but 1-12 in ISO notation, so we
              // decrement.
              if (i == 1) {
                match[i]--;
              }
            }

            // parse the UTC offset component
            var minuteOffset = +match.pop(), hourOffset = +match.pop(), sign = match.pop();

            // compute the explicit time zone offset if specified
            var offset = 0;
            if (sign) {
              // detect invalid offsets and return early
              if (hourOffset > 23 || minuteOffset > 59) {
                return NaN;
              }

              // express the provided time zone offset in minutes. The offset is
              // negative for time zones west of UTC; positive otherwise.
              offset = (hourOffset * 60 + minuteOffset) * 6e4 * (sign == '+' ? -1 : 1);
            }

            // Date.UTC for years between 0 and 99 converts year to 1900 + year
            // The Gregorian calendar has a 400-year cycle, so
            // to Date.UTC(year + 400, .... ) - 12622780800000 == Date.UTC(year, ...),
            // where 12622780800000 - number of milliseconds in Gregorian calendar 400 years
            var year = +match[0];
            if (0 <= year && year <= 99) {
              match[0] = year + 400;
              return NativeDate.UTC.apply(this, match) + offset - 12622780800000;
            }

            // compute a new UTC date value, accounting for the optional offset
            return NativeDate.UTC.apply(this, match) + offset;
          }
          return NativeDate.parse.apply(this, arguments);
        };

        return Date;
      })(Date);

})();

/**#nocode-*/
