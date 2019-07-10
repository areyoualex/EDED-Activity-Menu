# Earth Day Every Day Activity Menu

[![Netlify Status](https://api.netlify.com/api/v1/badges/61c2a43a-5a6d-44b3-b678-202616cf7f3f/deploy-status)](https://app.netlify.com/sites/activity-menu/deploys)

## Introduction
This file should tell you everything you need to know about maintaining this website.

## Table of Contents

- [Adding organizations](#adding-organizations)
- [Changing the category or 5 pillars names](#changing-the-category-or-5-pillars-colors)
  - Make sure to [change the names in colorMap.json](#changing-the-category-or-5-pillars-colors)
- [Changing the styles](#changing-the-styles)
  - [Changing the category or 5 pillars colors](#changing-the-category-or-5-pillars-colors)
- [Changing contact information](#changing-contact-information)

## Adding organizations

You can add organizations in the "organization" sheet in the _SFUSD  Activities_
Google Sheet. Add an ID number for the new organization, and put in the name and
link to their website. The name will be used as alt text for their logo image on
the activity menu.

### Getting the Photo ID from Google Drive

In order to add an organization image, you will need to upload that image to
Google Drive (in the EDED Organization Logos folder). After you do that, right
click the image and copy the link to share (it is not the same as the link when
you double click the image! You must right click the image and "Get shareable
link").

Next, paste that link into the "Photo ID in Google Drive" column. The link
should look something like
https://drive.google.com/open?id=LOTSOFWEIRDCHARACTERS. You only want the lots
of weird characters part, so delete everything before that, from **https://** up
to **id=**.

Since Google Drive has an image download quota for public images, you must
trigger a Netlify build manually to update the image on the site. Go to
netlify.com and log in as the SFUSD Sustainability account, then click on
activity-menu. In the top bar, click on Deploys. There should be a button on the
right that says "Trigger deploy" - click that, then click on "Deploy site".

## Changing the category or 5 pillars names

The website's categories that are shown in the filter are dynamically updated,
so simply change the names in the spreadsheet with find and replace and you'll
be good to go.

If you do this, make sure to [update the names in colorMap.json](#changing-the-category-or-5-pillars-colors).

## Changing the styles

Some parts of the website's style are easier to change than others.

### Changing the Category or 5 Pillars colors

To change the Category pill background colors, go to  `colorMap.json` (located
in `src/`) and change the color hex codes directly.

_Make sure the category names in here directly match with the
category names you use in the activities spreadsheet._

### Changing the page layout or styles

If you want to get more hands-on with editing the layout or styles, you can edit
the components in `src/components` and their respective `.module.css` files.

## Adding activities

It should be relatively self-explanatory to update the activity menu with new
activities. However, here's some notes to make sure the activities are formatted
correctly:

- Make sure to match the Organization ID with the corresponding ID in the  
  organization sheet.

- If the partner requests to add a link, you can add up to 3 links that will be
  displayed at the bottom of the activity. Link Text will be the text shown, and
  Link will be the actual URL.

- When writing the grade level, make sure to replace kindergarten with 0. Please
  write either a single number or a range between two numbers written as "#-#".

- Activities can be multiple types or categories. When doing this, make sure to
  delimit each separate category or type with a single comma (no space!). For
  example, an activity that gives points for both Zero Waste and Water
  Resilience should have an Category column of "Zero Waste,Water Resilience", _not_ "Zero Waste, Water Resilience".

## Changing contact information

Unfortunately, I could not synchronize the contact information directly from the
footer of the website to this site. However, in case it changes, I made it easy
to update from `gatsby-config.js`. From there, you can change the title of EDED,
the name of the page (Activity Menu), the home url (earthdayeverydaysf.com), the
contact email and social media handles.
