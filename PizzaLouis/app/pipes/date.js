"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ReadableDatePipe = (function () {
    function ReadableDatePipe() {
    }
    ReadableDatePipe.prototype.transform = function (date) {
        var d = new Date(date);
        var v = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
        return v;
    };
    return ReadableDatePipe;
}());
ReadableDatePipe = __decorate([
    core_1.Pipe({ name: 'readableDate' }),
    __metadata("design:paramtypes", [])
], ReadableDatePipe);
exports.ReadableDatePipe = ReadableDatePipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUM7QUFHckMsSUFBYSxnQkFBZ0I7SUFDM0I7SUFBYyxDQUFDO0lBRWYsb0NBQVMsR0FBVCxVQUFVLElBQUk7UUFDWixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXpELE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQztBQVRZLGdCQUFnQjtJQUQ1QixXQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFDLENBQUM7O0dBQ2hCLGdCQUFnQixDQVM1QjtBQVRZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe25hbWU6ICdyZWFkYWJsZURhdGUnfSlcbmV4cG9ydCBjbGFzcyBSZWFkYWJsZURhdGVQaXBlIHtcbiAgY29uc3RydWN0b3IoKXt9XG5cbiAgdHJhbnNmb3JtKGRhdGUpIHtcbiAgICBsZXQgZCA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIGxldCB2ID0gZC5nZXREYXRlKCkrXCIvXCIrZC5nZXRNb250aCgpK1wiL1wiK2QuZ2V0RnVsbFllYXIoKTtcbiAgICBcbiAgICByZXR1cm4gdjtcbiAgfVxufSJdfQ==