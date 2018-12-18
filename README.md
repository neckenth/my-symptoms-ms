# my-symptoms-ms
Chrome extension for daily popup to track various Relapsing-Remitting MS symptoms.

# add extension to your Chrome browser
This extension has not been formally published, but you can still add it to your browser following the instructions below:

--- `git clone` this repository to your local machine.

--- Make a new Google Sheet with the following column headers:

* Date
* Fatigue
* Numbness/Tingling
* Weakness
* Vision Problems
* Dizziness/Vertigo
* Cognitive Clarity
* Depression
* Balance
* Journal

![image](https://drive.google.com/uc?export=view&id=1qCoZS-6cejlbQCzmhVA2vSkld-j2_Nhs)

--- Make note of the SheetId, which can be found in the URL bar between "...spreadsheets/d/" and "/edit...". Copy this ID and overwrite the `spreadsheetId` declaration on line 38 in background.js to reflect your Sheet's ID.

--- go to chrome://extensions/ and click "Load unpacked extension..."

--- From your file explorer, select the repository's folder to add this extension. Make sure the "Enabled" box is checked on the extensions page.

--- You'll see the MySymptoms-MS extension has been added to your Chrome browser. 

![image](https://drive.google.com/uc?export=view&id=1WxQ7EXJeUnywRmN7DlYZEPJESg-2RR_m)

--- Click the extension icon to show the popup. 

![image](https://drive.google.com/uc?export=view&id=1V453htu8XNFU-pNdrBYxk4Ox770_O7tA)

# usage
To use this extension, simply populate the symptom rating fields, note any additional information about how you're feeling, and click the Submit button.

You should see the data is immediately posted to the Google Sheet you created. You can then create visualizations and do any other additional analysis as you deem necessary.

# Hopeful future features:
* Twilio reminder to fill out spreadsheet each day
* Auto-create spreadsheet

