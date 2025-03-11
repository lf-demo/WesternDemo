(function(window, undefined) {
    if (window.document && window.Worker) {
        var worker = new Worker("dbf.js")
        var DBF = function(url, callback) {
            var w = this._worker = worker, t = this
            w.onmessage = function(e) {
                t.data = e.data
                if (callback) callback(e.data);
            };
            w.postMessage(url)
        }
        window["DBF"] = DBF
        return
    }
    var IN_WORKER = !window.document
    if (IN_WORKER) {
        importScripts('stream.js')
        onmessage = function(e) {
            new DBF(e.data);
        };
    }
    var DBASE_LEVEL = {
            "3": "dBASE Level 5",
            "4": "dBase Level 7"
        },
        DBASE_FIELD_TYPE = {
            "N": "Number",
            "C": "Character",
            "L": "Logical",
            "D": "Date",
            "M": "Memo",
            "F": "Floating point",
            "B": "Binary",
            "G": "General",
            "P": "Picture",
            "Y": "Currency",
            "T": "DateTime",
            "I": "Integer",
            "V": "VariField",
            "X": "Variant",
            "@": "Timestamp",
            "O": "Double",
            "+": "Autoincrement",
            "O": "Double",
            "@": "Timestamp"
        }
    var DBF = function(url, callback) {
        if (!!(url.lastModifiedDate || url.lastModified))
            this.handleFile(url, callback);
        else
            this.handleUri(url, callback);
    }
    DBF.prototype = {
        constructor: DBF,
        handleFile: function(file, callback) {
            this.callback = callback;
            var reader = window.FileReader ? new FileReader() : new FileReaderSync();
            reader.onload = (function(that) {
                return function(e) {
                    that.onFileLoad(e.target.result)
                }
            })(this);
            if (!!window.FileReader) {
                reader.readAsBinaryString(file);
            } else {
                this.onFileLoad(reader.readAsBinaryString(file));
            }
        },
        onFileLoad: function(data) {
            this.stream = new Gordon.Stream(data)
            this.readFileHeader()
            this.readFieldDescriptions()
            this.readRecords()
            this._postMessage()
        },
        handleUri: function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false)
            xhr.overrideMimeType("text/plain; charset=x-user-defined")
            xhr.send()
            if (200 !== xhr.status)
                throw "Unable to load " + url + " status: " + xhr.status
            this.stream = new Gordon.Stream(xhr.responseText)
            this.callback = callback
            this.readFileHeader()
            this.readFieldDescriptions()
            this.readRecords()
            this._postMessage()
        },
        _postMessage: function() {
            var data = {
                header: this.header,
                fields: this.fields,
                records: this.records
            }
            if (IN_WORKER) postMessage(data)
            else if (this.callback) this.callback(data)
        },
        readFileHeader: function() {
            var s = this.stream,
                header = this.header = {},
                date = new Date;
            header.version = DBASE_LEVEL[s.readSI8()]
            date.setUTCFullYear(1900 + s.readSI8())
            date.setUTCMonth(s.readSI8())
            date.setUTCDate(s.readSI8())
            header.lastUpdated = date
            header.numRecords = s.readSI32()
            header.firstRecordPosition = s.readSI16()
            header.recordLength = s.readSI16()
            s.offset += 16
            header.flags = s.readSI8()
            header.codePageMark = s.readSI8()
            s.offset += 2
        },
        readFieldDescriptions: function() {
            var s = this.stream,
                fields = [],
                field
            while (s.readSI8() !== 0x0D) {
                s.offset--
                field = {}
                field.name = s.readString(11).replace(/\u0000/g, "")
                field.type = DBASE_FIELD_TYPE[s.readString(1)]
                field.fieldDisplacement = s.readSI32()
                field.fieldLength = s.readUI8()
                field.decimals = s.readSI8()
                field.flags = s.readSI8()
                field.autoincrementNextValue = s.readSI32()
                field.autoincrementStepValue = s.readSI8()
                s.offset += 8
                fields.push(field)
            }
            this.fields = fields
        },
        readRecords: function() {
            var s = this.stream,
                numRecords = this.header.numRecords,
                recordsOffset = this.header.firstRecordPosition,
                recordSize = this.header.recordLength,
                fields = this.fields,
                numFields = fields.length,
                records = [],
                field, record
            for (var index = 0; index < numRecords; index++) {
                s.offset = recordsOffset + index * recordSize
                record = {}
                record._isDeleted = s.readSI8() === 42
                for (var i = 0; i < numFields; i++) {
                    field = fields[i]
                    record[field.name] = s.readString(field.fieldLength).trim();
                }
                records.push(record);
            }
            this.records = records
        }
    }
    window["DBF"] = DBF;
})(self);
