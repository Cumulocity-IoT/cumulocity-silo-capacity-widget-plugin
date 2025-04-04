# Deprecation notice

This plugin is not further developed and it might break with upcoming Cumulocity releases. Use it at your own risk.
The repository is archived but feel free to fork & adapt it to your needs in a new repo.

# Cumulocity Silo Capacity Widget Plugin [<img width="35" src="https://user-images.githubusercontent.com/32765455/211497905-561e9197-18b9-43d5-a023-071d3635f4eb.png"/>](https://github.com/Cumulocity-IoT/cumulocity-silo-capacity-widget-plugin/releases/download/1.2.1/sag-ps-pkg-silo-capacity-1.2.1.zip)

Cumulocity Silo Capacity Widget is the Cumulocity module federation plugin created using c8ycli. This plugin can be used in Application Builder or Cockpit. It displays a configurable silo capacity graphic with fill levels, foreground image overlay, optional background image and colorized thresholds.

![Image](images/batterycapacity.png)

![Image](images/currentfill.png)

![Image](images/oilstorage.png)


### Please choose Silo Capacity Widget release based on Cumulocity/Application builder version:

|APPLICATION BUILDER&nbsp;|&nbsp;CUMULOCITY&nbsp;|&nbsp;SILO CAPACITY WIDGET PLUGIN&nbsp;|
|--------------------|------------------------|--------------|
| 2.0.x              | >=1018.0.0 <1019.0.0   | 1.2.x        |
| 2.0.x              | >=1016.0.0 <1018.0.0   | 1.1.x        |

## Features
**Configurable cylinder:** Set the height, width, color and location of the cylinder in your widget
**Configurable volume calculation** Display remaining volume or fill volume
**Optional foreground image:** Upload and dynamically position a foreground image over the top of the cylinder
**Optional background image:** Upload and dynamically position a background image behind the cylinder 
**Configurable labels:** Add your own description labels for the levels
**Optional Thresholds:** Set high and medium thresholds with custom colors 
**Development debug mode:** Use the debug mode to check the cylinder range and to accurately position your images over the cylinder

## Prerequisite
   Cumulocity c8ycli >=1018.x.x
   
## Installation
### Runtime Widget Deployment?

* This widget support runtime deployment. Download [Runtime Binary](https://github.com/Cumulocity-IoT/cumulocity-silo-capacity-widget-plugin/releases/download/1.2.1/sag-ps-pkg-silo-capacity-1.2.1.zip) and install via Administrations --> Ecosystems --> Applications --> Packages 

## QuickStart

This guide will teach you how to add the widget in your existing or new dashboard.

1. Open the Application Builder application from the app switcher (Next to your username in the top right)
2. Add a new dashboard or navigate to an existing dashboard
3. Click `Add Widget`
4. Search for `Silo Capacity`
5. Select `Target Assets or Devices`
6. Click `Save`

Congratulations! Silo Capacity is configured.

## User Guide
### Configuration options

The widget configuration page contains a number of configuration attributes.


 - **Title** : Enter the title which will display at the top of your widget

   

 - **Target Assets or Devices** : Select your device

   

**Measurement Configuration** section


- **Measurement** : Select the measurement fragment and series from the dropdown
  
  
  
  **NOTE**: Once the **Target Assets or Devices** and **Measurement** information has been populated, you can click the 'Save' button to configure the widget with the default settings
  
   
  
- **Maximum fill level label** : Enter the label which will be displayed above the maximum fill level amount (note, if no label is entered, this section will not be displayed in the widget)


- **Maximum fill amount** : Enter the maximum fill amount for the device you have linked to this widget


- **Fill level unit** : Enter the fill level unit for the device which you have linked to this widget


- **Fill or remaining label** : Enter the label which will be displayed for the calculated fill or remaining volume (note, if no label is entered, this section will not be displayed in the widget)


- **Fill or remaining calculation** : The measurement percentage which is received can be used to calculate the remaining volume left in the cylinder or to calculate the amount of volume until the container is full  


- **Current fill percentage label** : Enter the label which will be displayed for the current measurement percentage (note, if no label is entered, this section will not be displayed in the widget)


- **Measurement is a percent or value** : Select whether the data being provided in the measurement is a percent or value


**Cylinder configuration** section


- **Height (px)** : Enter the height of the cylinder in pixels


- **Width (px)** : Enter the width of the cylinder in pixels


- **Left margin (px)** : To position the cylinder, enter the amount of pixels which should be padded on the left


- **Top margin (px)** :  To position the cylinder, enter the amount of pixels which should be padded at the top


- **Tilt height (px)** : The cylinder angle can be adjusted by amending the tilt height. Use this to adjust the cylinder to match the foreground and background image angle


- **Cylinder color (hex, rgb, rgba)** : Click on this field to select the color from the color palette. Alternatively, manually enter the hex value ( e.g. #d9ca1fff ), rgb value ( e.g. rgb(128, 255, 128) ), rgba value ( e.g. rgba(160, 160, 160, 0.5) ),  or the color string ( e.g. red, orange )


- **Cylinder fill color (hex, rgb, rgba)** : Click on this field to select the color from the color palette. Alternatively, manually enter the hex value ( e.g. #d9ca1fff ), rgb value ( e.g. rgb(128, 255, 128) ), rgba value ( e.g. rgba(160, 160, 160, 0.5) ),  or the color string ( e.g. red, orange )

  

**Foreground image configuration (optional)** section

- **Image file (png, jpeg, jpg)** : Click the button to select and upload a foreground image


- **Height (%)** : Enter the height in percent for the image


- **Left margin (px)** : To position the foreground image, enter the amount of pixels which should be padded on the left


- **Top margin (px)** : To position the foreground image, enter the amount of pixels which should be padded at the top


- **Show foreground image** : Once the foreground image has been uploaded and the image attributes have been entered, it is possible to hide the foreground by selecting this option

  
  

**Background image configuration (optional)** section

- **Image file (png, jpeg, jpg)** : Click the button to select and upload a background image


- **Height (%)** : Enter the height in percent for the image


- **Left margin (px)** : To position the background image, enter the amount of pixels which should be padded on the left 


- **Top margin (px)** : To position the background image, enter the amount of pixels which should be padded at the top


- **Show background image** : Once the background image has been uploaded and the image attributes have been entered, it is possible to hide the background by selecting this option



**Threshold configuration (optional)** section

- **High threshold range : Minimum value (%)** : Enter the minimum value for the high threshold range


- **High threshold range : Maximum value (%)** : Enter the maximum value for the high threshold range 


- **High threshold range : color (hex, rgb, rgba)** : Enter the hex value ( e.g. #d9ca1fff ), rgb value ( e.g. rgb(128, 255, 128) ), rgba value ( e.g. rgba(160, 160, 160, 0.5) ),  or the color string ( e.g. red, orange ) which will be used to set the label values and the cylinder color when the high threshold is breached


- **Medium threshold range : Minimum value (%)** : Enter the minimum value for the medium threshold range


- **Medium threshold range : Maximum value (%)** : Enter the maximum value for the medium threshold range


- **Medium threshold range : color (hex, rgb, rgba)** : Enter the hex value ( e.g. #d9ca1fff ), rgb value ( e.g. rgb(128, 255, 128) ), rgba value ( e.g. rgba(160, 160, 160, 0.5) ),  or the color string ( e.g. red, orange ) which will be used to set the label values and the cylinder color when the medium threshold is breached


- **Enable thresholds** : Once the threshold information has been entered, it is possible to disable the threshold processing by selecting this option



**Development (optional)** section

- **Enable debug mode** : The debug mode option allows the user to interact with the widget for development purposes.

  - Spin selector : In debug mode, the widget 'value' is replaced with a spin input and the measurement input from the device is disabled. Clicking in the spinner simulates the measurement input and causes the cylinder to calculate and display accordingly.
  
  - Foreground and background positioning: Debug mode can be used to assist in the fine tuning for the positions of the foreground and background images
    - Drag using the left mouse button : Drag the foreground and background images to temporarily view the position of the underlying cylinder.
    - Drag using the left mouse button **and the Ctrl key** : When the Ctrl key is pressed during the mouse drag, this automatically updates the foreground and background left margin and top margin. To save the position changes, edit the widget and click the save button.

------------------------------

This widget is provided as-is and without warranty or support. They do not constitute part of the Cumulocity product suite. Users are free to use, fork and modify them, subject to the license agreement. While Cumulocity GmbH welcomes contributions, we cannot guarantee to include every contribution in the master project.
_____________________
For more information you can Ask a Question in the [TECH Community Forums](https://techcommunity.cumulocity.com).
