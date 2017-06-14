// import 'rxjs/Rx'; // adds ALL RxJS statics & operators to Observable
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// See node_module/rxjs/Rxjs.js
// Import just the rxjs statics and operators needed for THIS app.
// Statics
require("rxjs/add/observable/throw");
// Operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/map");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/toPromise");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnhqcy1vcGVyYXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyeGpzLW9wZXJhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1RUFBdUU7OztBQUV2RSwrQkFBK0I7QUFDL0Isa0VBQWtFO0FBRWxFLFVBQVU7QUFDVixxQ0FBbUM7QUFFbkMsWUFBWTtBQUNaLG1DQUFpQztBQUNqQywwQ0FBd0M7QUFDeEMsa0RBQWdEO0FBQ2hELGlDQUErQjtBQUMvQix1Q0FBcUM7QUFDckMsdUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICdyeGpzL1J4JzsgLy8gYWRkcyBBTEwgUnhKUyBzdGF0aWNzICYgb3BlcmF0b3JzIHRvIE9ic2VydmFibGVcblxuLy8gU2VlIG5vZGVfbW9kdWxlL3J4anMvUnhqcy5qc1xuLy8gSW1wb3J0IGp1c3QgdGhlIHJ4anMgc3RhdGljcyBhbmQgb3BlcmF0b3JzIG5lZWRlZCBmb3IgVEhJUyBhcHAuXG5cbi8vIFN0YXRpY3NcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aHJvdyc7XG5cbi8vIE9wZXJhdG9yc1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RlYm91bmNlVGltZSc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2Rpc3RpbmN0VW50aWxDaGFuZ2VkJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc3dpdGNoTWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcbiJdfQ==