"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TrackerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerModule = void 0;
const common_1 = require("@nestjs/common");
const tracker_service_1 = require("./tracker.service");
const tracker_options_service_1 = require("./tracker-options.service");
let TrackerModule = TrackerModule_1 = class TrackerModule {
    static register(options) {
        return {
            module: TrackerModule_1,
            providers: [
                {
                    provide: tracker_service_1.TrackerService,
                    useValue: new tracker_service_1.TrackerService(options),
                },
                tracker_options_service_1.TrackerOptionsService,
            ],
            exports: [tracker_service_1.TrackerService],
        };
    }
};
TrackerModule = TrackerModule_1 = __decorate([
    (0, common_1.Module)({})
], TrackerModule);
exports.TrackerModule = TrackerModule;
//# sourceMappingURL=tracker.module.js.map