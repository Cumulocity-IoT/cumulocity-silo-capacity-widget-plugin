/*
* Copyright (c) 2019 Software AG, Darmstadt, Germany and/or its licensors
*
* SPDX-License-Identifier: Apache-2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
 */
import { Component, Input, OnInit,DoCheck } from '@angular/core';
import { WidgetConfig } from './i-widget-config';
import * as _ from 'lodash'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FetchClient } from '@c8y/client';
import {
    DatapointAttributesFormConfig,
    DatapointSelectorModalOptions,
    KPIDetails,
  } from '@c8y/ngx-components/datapoint-selector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AbstractControl, FormBuilder, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

  export function singleDatapointValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => { 
      const datapoints: any[] = control.value; 
      if (!datapoints || !datapoints.length) {  return null;  }  
      const activeDatapointsList = datapoints.filter(datapoint => datapoint.__active);  
      if (activeDatapointsList.length === 1) { 
        return null;  
      } 
      return { singleDataPointActive: true }; 
    };
  
  }

@Component({
    selector: 'silo-capacity-widget-config',
    templateUrl: './silo-capacity-widget-config.component.html',
    styleUrls: ['./silo-capacity-widget-config.component.css']
})
export class SiloCapacityWidgetConfig implements OnInit{

    @Input() config: WidgetConfig;
    datapointSelectDefaultFormOptions: Partial<DatapointAttributesFormConfig> = {
        showRange: false,
        showChart: false,
      };
    datapointSelectionConfig: Partial<DatapointSelectorModalOptions> = {};
    formGroup: ReturnType<SiloCapacityWidgetConfig['createForm']>;
    configDevice = null;

    private oldDeviceId: string = '';
    private foregroundImageFileAsString: string;
    private backgroundImageFileAsString: string;

    public cylinderFillColorPickerClosed = true;
    public cylinderColorPickerClosed = true;
    public thresholdHighColorPickerClosed = true;
    public thresholdMediumColorPickerClosed = true;

    public supportedSeries: string[];

    public CONST_HELP_IMAGE_FILE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADdgAAA3YBfdWCzAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAATzSURBVGiB7VlrTBxVFP7usLu8kUeBLSAFipUqFg1Qq5EgaCU2/DAxpYqJCVExmNC0Km1jolmbxgSCKbWoITG+oq1Ba6M1mvQHqxJTEyS0aEBiSyvIY2F5dl32Mczxh1WZndmdubOoTeD7d88995zvzH2cM/cC61jH2gZbFSs2m2B1l5VIEMoYUArgFgBZAa5GARogRj0CE7ono77uhc0mhes6rAAyD9iz/MQamUCPgZDJOXwUhA9FUWqfOXrfmFEOhgLIPtSd5JXEwwCeAhBp1Pk1eMDQ4fXCNt9WMc87mDsA68GuGiLWDiCVd6wGHAR6Zqql8lOeQfoDqP/BnJ7oageonpsaB4jw+lQs9sFWIerR1xVAqs0eJyyxUyB6IDx6+kDAV0zy7Xa0Vv2upStoKeQ3fhkpuPHFf0UeABjwIATLmVttnRYtXc0AXFFRRwGUrwozPlQ4l1JbtJRCLqH0JvseMHy0epz4QaCHQ23soAFsOHA2I4JZBkGUoNcZY8CO3CRUF1lRdGM8Yi0mAIBPlHBx2o2uwWmc6XfAJ/LkLzYLybvV0Vo1pdZrCjYsAubDPOQTos048lAB7t6cpNqfEmfBnbmJqN2RiYOfDOLilOb+vAZKZoLlZQANar2qM2A9ZM8hCb8gRIArYRIYOh7fhqKsG3RRcrp8qOnoxeKSX5c+AH8EE/PHm3eOBHaobmJaxtPQSR4AqovSFeRFidBzZR7nhufg9i/L+jbEWVC7navyMC+TSTX/KAOw2U1gqOOxvqswTdb2ixLq37+Ahg/60XjiR9S8qfza5VuSeVwAYHXY3RkRKFUEkLYkbQeQzmM6LzVW1u4amkH/b4t/tycXPbAPzch0spKjeVwAoAxrbkpxoFQRACOhgtMyEmPMsvbo7JJCx+WVVwbE6wQAoOSmts5LeM2WHPlWU6d4k3yPXJ7WewqtAENpoEhtE9/Ebzk0HinNRIE1Xib7/LyD2w4RtgTKVAJgG7kth0B1UTr278yTyfpGFnC6b8KIOQU3tSUUZ8SyGmpKMtBUlQ+2Ittcdrrx3McDkIxtgvhAgcoM0Kr8J2/LSsDzVZtl5H+dcWPvyZ94Epgm1JbQ1dUw3HBvDoQV7CcWPHjyvQuYWPCEY1bBTW0GDC3OlYiLNOGObPmp8+JnQ5hzh/3lFdyUeYDh53C9bEqJgUn45+uPz3twfmQhXLOACjdFAEToC9dPQpQ841+adodrEgDACL2BMsUpREyyM9L8UQuJc8NzupIbPyR7oETBdCq6+3uAKcrW/x9seLKlsidQqlKN2iQQnQjHlUlgaCjPwbt1t+N47W3YulFxfBsAnQSYInuo/w+Yl9sAKCsyndhTmoknyrJRmJmAu/KS8NqjhYgxKyphHrgiltGm1qEawNQr9zuI8LZRb8U5ibJ2UowZeWmxQbR14a3xVyucah1Bd6voWXoBKueuHozNySdPlMh4AmMYW4b5pWDdQQOYPb5rEYT9Rny+890oBib+TJp+UULr2UuYcfmMmAIR7XW23BO0OtCse6xNXW8QY6o3AlrYEGfBVa8Ir9/gMwDDMUdzxb5QKpoH/uQVZyMYThvx73T5DJNnDKcc0d88q6mnx9j1fLm7Nq7XV+J6e+DgLnommys7IwXTzQDaAXh5x6vAA4ZjXh8KeMkDa/WRT4Hgz6x/3fTO/VvPrOtYx1rHHxm4yOkGvwZ0AAAAAElFTkSuQmCC";
    private destroy$ = new Subject<void>();

    constructor(private fetchClient: FetchClient, private formBuilder: FormBuilder, private form: NgForm) { }

    ngOnInit() {

        this.initForm();
        this.formGroup.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
        this.config.datapoints = [ ...value.datapoints ];
      });
    }



    // Cylinder configuration

    public setCylinderHeight($event: Event) {
        const height: number = Number(($event.target as HTMLInputElement).value);
        if (height >= 0) {
            this.config.cylinderHeight = height;
        } else {
            console.error('Cylinder height must be a positive value');
        }
    }

    public setCylinderWidth($event: Event) {
        const width: number = Number(($event.target as HTMLInputElement).value);
        if (width >= 0) {
            this.config.cylinderWidth = width;
        } else {
            console.error('Cylinder width must be a positive value');
        }
    }

    public setCylinderTopMargin($event: Event) {
        const fillContainerTopMargin: number = Number(($event.target as HTMLInputElement).value);
        if (fillContainerTopMargin >= 0) {
            this.config.cylinderTopMargin = fillContainerTopMargin;
        } else {
            console.error('Cylinder top margin must be a positive value');
        }
    }

    public setCylinderLeftMargin($event: Event) {
        const fillContainerLeftMargin: number = Number(($event.target as HTMLInputElement).value);
        if (fillContainerLeftMargin >= 0) {
            this.config.cylinderLeftMargin = fillContainerLeftMargin;
        } else {
            console.error('Cylinder left margin must be a positive value');
        }
    }

    public setCylinderTiltHeight($event: Event) {
        let tiltHeight: number = Number(($event.target as HTMLInputElement).value);
        if (tiltHeight >= 0) {
            if (tiltHeight === 0) {
                tiltHeight = 1;
            }
            if (tiltHeight > 50) {
                tiltHeight = 50;
            }
            this.config.cylinderTiltHeight = tiltHeight;
        } else {
            console.error('Cylinder tilt height must be a positive value');
        }
    }


    public openCylinderColorPicker() {
        this.cylinderColorPickerClosed = false;
    }

    public closeCylinderColorPicker() {
        this.cylinderColorPickerClosed = true;
    }

    public setCylinderColor(value: string) {
        this.config.cylinderColor = value;
    }

    public openCylinderFillColorPicker() {
        this.cylinderFillColorPickerClosed = false;
    }

    public closeCylinderFillColorPicker() {
        this.cylinderFillColorPickerClosed = true;
    }

    public setCylinderFillColor(value: string) {
        this.config.cylinderFillColor = value;
    }

    public openThresholdHighColorPicker() {
        this.thresholdHighColorPickerClosed = false;
    }

    public closeThresholdHighColorPicker() {
        this.thresholdHighColorPickerClosed = true;
    }

    public setThresholdHighColor(value: string) {
        this.config.thresholdHighColor = value;
        this.config.enableThresholds = true;
    }

    public openThresholdMediumColorPicker() {
        this.thresholdMediumColorPickerClosed = false;
    }

    public closeThresholdMediumColorPicker() {
        this.thresholdMediumColorPickerClosed = true;
    }

    public setThresholdMediumColor(value: string) {
        this.config.thresholdMediumColor = value;
        this.config.enableThresholds = true;
    }

    // Foreground image configuration

    public onForegroundImageFileUpdated($event: Event) {
        const imageFile = ($event.target as HTMLInputElement).files[0];
        if (imageFile.type.match('image.*')) {
            if (['png', 'jpeg'].indexOf(imageFile.type.split("/")[1]) >= 0) {
                const reader = new FileReader();
                reader.readAsDataURL(imageFile);
                reader.onload = () => {
                    this.foregroundImageFileAsString = reader.result as string;
                    _.set(this.config, 'foregroundImageText', this.foregroundImageFileAsString);
                    // Set the 'showForegroundImage' flag as we have added a foreground image
                    this.config.showForegroundImage = true;

                    // Get and store the foreground file height
                    const foregroundImage = new Image();
                    foregroundImage.src = this.foregroundImageFileAsString;
                    foregroundImage.onload = () => {
                        this.config.foregroundImageHeightInPixels = foregroundImage.height;
                    }
                };
            } else {
                console.error('Image file can only be .png, .jpeg, or .jpg');
            }
        } else {
            console.error('Image file must be either .png, .jpeg, or .jpg');
        }
    }

    public setForegroundImageSize($event: Event) {
        let size: number = Number(($event.target as HTMLInputElement).value);
        if (size >= 100) {
            size = 100;
        }
        if (size < 0) {
            size = 0;
        }
        this.config.foregroundImageHeightPercent = size;
    }

    public setForegroundImageLeftMargin($event: Event) {
        this.config.foregroundImageLeftMargin = Number(($event.target as HTMLInputElement).value);
    }

    public setForegroundImageTopMargin($event: Event) {
        this.config.foregroundImageTopMargin = Number(($event.target as HTMLInputElement).value);
    }


    // Background image configuration

    public onBackgroundImageFileUpdated($event: Event) {
        const imageFile = ($event.target as HTMLInputElement).files[0];
        if (imageFile.type.match('image.*')) {
            if (['png', 'jpeg'].indexOf(imageFile.type.split("/")[1]) >= 0) {
                const reader = new FileReader();
                reader.readAsDataURL(imageFile);
                reader.onload = () => {
                    this.backgroundImageFileAsString = reader.result as string;
                    _.set(this.config, 'backgroundImageText', this.backgroundImageFileAsString);
                    // Set the 'showBackgroundImage' flag as we have added a background image
                    this.config.showBackgroundImage = true;

                    // Get and store the background image file height
                    const backgroundImage = new Image();
                    backgroundImage.src = this.backgroundImageFileAsString;
                    backgroundImage.onload = () => {
                        this.config.backgroundImageHeightInPixels = backgroundImage.height;
                    }
                };
            } else {
                console.error('Background image file can only be .png, .jpeg, or .jpg');
            }
        } else {
            console.error('Background image file must be either .png, .jpeg, or .jpg');
        }
    }

    public setBackgroundImageSize($event: Event) {
        let size: number = Number(($event.target as HTMLInputElement).value);
        if (size >= 100) {
            size = 100;
        }
        if (size < 0) {
            size = 0;
        }
        this.config.backgroundImageHeightPercent = size;
    }

    public setBackgroundImageLeftMargin($event: Event) {
        this.config.backgroundImageLeftMargin = Number(($event.target as HTMLInputElement).value);
    }

    public setBackgroundImageTopMargin($event: Event) {
        this.config.backgroundImageTopMargin = Number(($event.target as HTMLInputElement).value);
    }

    public setThresholdHighRangeMin($event: Event) {
        this.config.thresholdHighRangeMin = Number(($event.target as HTMLInputElement).value);
        this.config.enableThresholds = true;
    }

    public setThresholdHighRangeMax($event: Event) {
        this.config.thresholdHighRangeMax = Number(($event.target as HTMLInputElement).value);
        this.config.enableThresholds = true;
    }

    private initForm(): void {
        this.formGroup = this.createForm();
        this.form.form.addControl('config', this.formGroup);
        if (this.config?.datapoints) {
          this.formGroup.patchValue({ datapoints: this.config.datapoints });
        }
      }

    private createForm() {
        return this.formBuilder.group({
          datapoints: this.formBuilder.control(new Array<KPIDetails>(), [
            Validators.required,
            Validators.minLength(1),
            singleDatapointValidation()
          ])
        });
      }

}
