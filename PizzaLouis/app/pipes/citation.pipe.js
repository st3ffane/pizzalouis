"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CitationPipe = (function () {
    function CitationPipe() {
    }
    CitationPipe.prototype.transform = function (ph) {
        return '"' + ph + '"';
    };
    return CitationPipe;
}());
CitationPipe = __decorate([
    core_1.Pipe({ name: 'citation' }),
    __metadata("design:paramtypes", [])
], CitationPipe);
exports.CitationPipe = CitationPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0YXRpb24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNpdGF0aW9uLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUM7QUFHckMsSUFBYSxZQUFZO0lBQ3ZCO0lBQWMsQ0FBQztJQUVmLGdDQUFTLEdBQVQsVUFBVSxFQUFFO1FBR1YsTUFBTSxDQUFDLEdBQUcsR0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBUlksWUFBWTtJQUR4QixXQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDLENBQUM7O0dBQ1osWUFBWSxDQVF4QjtBQVJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7bmFtZTogJ2NpdGF0aW9uJ30pXG5leHBvcnQgY2xhc3MgQ2l0YXRpb25QaXBlIHtcbiAgY29uc3RydWN0b3IoKXt9XG5cbiAgdHJhbnNmb3JtKHBoKSB7XG4gICAgXG4gICAgXG4gICAgcmV0dXJuICdcIicrcGgrJ1wiJztcbiAgfVxufSJdfQ==