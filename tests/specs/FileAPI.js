// https://github.com/MrSwitch/dropfile#readme







describe("FileAPI basics test suite", function(){
  var monade = function(desc, obj, property){
    it(desc, function(){
        runs(function(){
          expect(property in obj).toBe(true);
        });
      }
    );
  };


  //     interface FileList {
  //       getter File? item(unsigned long index);
  //       readonly attribute unsigned long length;
  //     };

  describe("FileList inherits Function: properties", function(){
    monade("FileList has property constructor", FileList, "constructor");
    monade("FileList has property length", FileList, "length");
  });

  describe("FileList inherits Function: methods", function(){
    monade("FileList has method toString()", FileList, "toString");
    // monade("FileList has method call()", FileList, "call");
    // monade("FileList has method apply()", FileList, "apply");
    // monade("FileList has method bind()", FileList, "bind");
    // monade("FileList has method isGenerator()", FileList, "isGenerator");
  });

  describe("FileList structure", function(){
    monade("FileList has property prototype", FileList, "prototype");
  });


// document.forms['uploadData']['fileChooser'].files[0];

  var mul = document.createElement('input');
  mul.setAttribute('type', 'file');
  mul.setAttribute('multiple', 'multiple');
  mul.setAttribute('style', 'visibility: hidden');

  var sin = document.createElement('input');
  sin.setAttribute('type', 'file');
  sin.setAttribute('multiple', 'multiple');
  sin.setAttribute('style', 'visibility: hidden');

  document.body.appendChild(mul);
  document.body.appendChild(sin);

  var basechecks = function(exp){
    it("HTMLInputElement has a property of type FileList", function(){
        runs(function(){
          expect(exp instanceof FileList).toBe(true);
        });
      }
    );

    monade("FileList instance has property length", exp, "length");
    monade("FileList instance has function item", exp, "item");

    it("Empty FileList length is 0", function(){
        runs(function(){
          expect(exp.length).toBe(0);
        });
      }
    );

    it("Empty FileList item(0) is null", function(){
        runs(function(){
          expect(exp.item(0)).toBe(null);
        });
      }
    );

  };


  describe("FileList instance via form", function(){
    basechecks(sin.files);
    basechecks(mul.files);
  });




    // [Constructor, Constructor((ArrayBufferView or Blob or DOMString)?[] blobParts, optional BlobPropertyBag options)] 
    // interface Blob {
      
    //   readonly attribute unsigned long long size;
    //   readonly attribute DOMString type;
      
    //   //slice Blob into byte-ranged chunks
      
    //   Blob slice(optional long long start,
    //              optional long long end,
    //              optional DOMString contentType); 
    
    // };

    // enum EndingTypes{"transparent", "native"};

    // dictionary BlobPropertyBag {
    
    //   DOMString type = "";
    //   EndingTypes endings = "transparent";
  
    // };

  describe("Blob inherits Function: properties", function(){
    monade("Blob has property constructor", Blob, "constructor");
    monade("Blob has property length", Blob, "length");
  });

  describe("Blob inherits Function: methods", function(){
    monade("Blob has method toString()", Blob, "toString");
    // monade("Blob has method call()", Blob, "call");
    // monade("Blob has method apply()", Blob, "apply");
    // monade("Blob has method bind()", Blob, "bind");
    // monade("Blob has method isGenerator()", Blob, "isGenerator");
  });

  describe("Blob structure", function(){
    monade("Blob has property prototype", Blob, "prototype");
  });


  var basechecks = function(exp){
    monade("Blob instance has property type", exp, "type");
    monade("Blob instance has property size", exp, "size");
    monade("Blob instance has function slice", exp, "slice");
    // it("HTMLInputElement has a property of type FileList", function(){
    //     runs(function(){
    //       expect(exp instanceof FileList).toBe(true);
    //     });
    //   }
    // );

  };

  describe("Blob instance via new Blob()", function(){
    var toto = new Blob();
    basechecks(toto);
  });


//   interface File : Blob {

//       readonly attribute DOMString name;
//       readonly attribute Date lastModifiedDate;
// };
  
  describe("File inherits Blob", function(){
    it("File is Blob", function(){
        runs(function(){
          expect(exp instanceof Blob).toBe(true);
        });
      }
    );
  });

  describe("Blob inherits Function: methods", function(){
    monade("Blob has method toString()", Blob, "toString");
    // monade("Blob has method call()", Blob, "call");
    // monade("Blob has method apply()", Blob, "apply");
    // monade("Blob has method bind()", Blob, "bind");
    // monade("Blob has method isGenerator()", Blob, "isGenerator");
  });

  describe("Blob structure", function(){
    monade("Blob has property prototype", Blob, "prototype");
  });


  var basechecks = function(exp){
    monade("Blob instance has property type", exp, "type");
    monade("Blob instance has property size", exp, "size");
    monade("Blob instance has function slice", exp, "slice()");
    // it("HTMLInputElement has a property of type FileList", function(){
    //     runs(function(){
    //       expect(exp instanceof FileList).toBe(true);
    //     });
    //   }
    // );

  };

  describe("Blob instance via new Blob()", function(){
    var toto = new Blob();
    basechecks(toto);
  });

});




    
    




    
// 6.1. Attributes

// size
// Returns the size of the Blob object in bytes. On getting, conforming user agents MUST return the total number of bytes that can be read by a FileReader or FileReaderSync object, or 0 if the Blob has no bytes to be read.

// type
// The ASCII-encoded string in lower case representing the media type of the Blob, expressed as an RFC2046 MIME type [RFC2046]. On getting, conforming user agents SHOULD return the MIME type of the Blob, if it is known. If conforming user agents cannot determine the media type of the Blob, they MUST return the empty string. A string is a valid MIME type if it matches the media-type token defined in section 3.7 "Media Types" of RFC 2616 [HTTP].

// Note
// Use of the type attribute informs the encoding determination and parsing the Content-Type header when dereferencing blob: URIs.