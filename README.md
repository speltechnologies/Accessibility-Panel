Accessibility Panel

Our project is to create accessibility panel designed for universal use. This is a platform to set accessibility configurations for your website.

Getting Started

To integrate the accessibility panel in your project, add accessibility.ftl to your screens.
Link all javascript files to your footer and add links to the style files to your header.

Implementation

In addition to this, you will have to add the following javascript code to your footer or to all those ftl pages where you want to implement the accessibility settings.

<script type="text/javascript">
    $(document).ready(function() {

           // accessibility - add tabIndex to p, h*, label, span tags dynamically if allText option is selected
             setTabIndexToSpeakAllText();

 });
</script>

JS Files

Slider.js contains the javascript functions for the accessibility page

spelscreenreader.js has implemented bespeak function that gets called on key press or performing the configured action.

Built With

Apache offbiz. 

Contributing

Feel free to use our code and contribute to the accessibility panel.


License

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

Acknowledgments

Please like and follow us on Github, Facebook and Twitter
Visit our website Speltechnologies.com

