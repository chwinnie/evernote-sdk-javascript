<h1>Prana: Customizable Momentum-style Chrome Dashboard</h1>

<h2>Overview</h2>
<p>A Momentum-style Chrome Extension that allows you to use your own quotes and photos, and warns you when you need to bring an umbrella. Quotes are pulled from Evernote.</p>

<p>The extension will first ask you to authenticate your Evernote account. After that, every new tab opened should display the following:</p>
<img src="/screenshots/screenshot.png"/>
<img src="/screenshots/rain-demo.png"/>


<h2>Prerequisites</h2>

<p>In order to run this extension, you need to obtain an Evernote API key from http://dev.evernote.com/documentation/cloud and an API key from Dark Sky from https://darksky.net/dev/</p>

<p>You will also need a user account on the Evernote sandbox service. Sign up for an account at https://sandbox.evernote.com/Registration.action</p>

<p>You will need to enter the Evernote information in auth.js. The dark sky information will need to be entered in app.js and services.js.</p>

<p>To run a chrome extension, go to chrome://extensions on a chrome browser and load /src/main/resources from this repository.</p>

<h2>Libraries/API used:</h2>
<ul>
	<li>Kanda Software Javascript Evernote SDK for quotes (forked)</li>
	<li>Dark Sky API for weather data</li>
</ul>

<h2>TODO</h2>
<ul>
	<li>Using a photo hosting service that can handle super high resolution photos</li>
	<li>Only works locally - need to get up and running on production</li>
	<li>Loading bars that display while API calls are still returning</li>
</ul>