<!-- 	 Created by SPEL Technologies Inc and HotWax Systems 

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
-->
<div class="container" id="accessibility-notification" style="display: none;">
	<div class="alert alert-success alert-dismissable text-center">
		<button type="button" class="close" data-dismiss="alert" aria-hidden="true">x</button>
		<strong>Settings Saved</strong>
	</div>
</div>

<div id="main-content" class="container accessibility">
	
	<div class="panel panel-primary">
		
		<div class="panel-heading text-center">
			<h1 id="Accessibility_h1">Accessibility</h1>
		</div>
		
		<div class="row help">
			<div class="col-sm-12">
				<button class="btn btn-success pull-right" onclick="helpVideo()">Help</button>
			</div>
			<div id='help-video'>
				<iframe id="playerid" class="videoFrame" src="https://www.youtube.com/embed/cPQj1lPfTkA?wmode=opaque&amp;rel=0&amp;autohide=1&amp;showinfo=0&amp;wmode=transparent&amp;modestbranding=1" frameborder="0" allowfullscreen></iframe>
            
				<button class='helpCloseButton' onclick="closeHelp()">CLOSE VIDEO</button>
			</div>
		</div>
		
		<div class="panel-body">
			<div id="accessibilitySliders" class="example" role="region" aria-labelledby="Accessibility_h1">
				<div class="row">
					<div class="col-sm-6">
						<div class="form-group">
							<label id="setContrast">Contrast</label>
							<div class="aria-widget-slider">
								<div class="rail">
									<input type="slider" name="set contrast" id="setContrastValue" class="thumb" aria-valuemin="0" aria-valuenow="100" aria-valuemax="400"
									aria-labelledby="setContrast">
								</input>
							</div>
							<div class="value">0
						</div>
					</div>
				</div>
				<div class="form-group">
					<label id="setMagnification">Magnification</label>
					<div class="flex-container flex-magnification-radios">
						<div class="flex-item">
							<input type="radio" name="magnificationValue" id="mag-50" value="50" onchange="aria.widget.slider.updateAccessability()">
							<label for="mag-50">50%</label>
						</div>
						<div class="flex-item">
							<input type="radio" name="magnificationValue" id="mag-100" value="100" onchange="aria.widget.slider.updateAccessability()">
							<label for="mag-100">100%</label>
						</div>
						<div class="flex-item">
							<input type="radio" name="magnificationValue" id="mag-200" value="200" onchange="aria.widget.slider.updateAccessability()">
							<label for="mag-200">200%</label>
						</div>
						<div class="flex-item">
							<input type="radio" name="magnificationValue" id="mag-400" value="400" onchange="aria.widget.slider.updateAccessability()">
							<label for="mag-400">400%</label>
						</div>
						<div class="flex-item">
							<input type="radio" name="magnificationValue" id="mag-1000" value="1000" onchange="aria.widget.slider.updateAccessability()">
							<label for="mag-1000">1000%</label>
						</div>
						<div class="flex-item">
							<input type="radio" name="magnificationValue" id="mag-1500" value="1500" onchange="aria.widget.slider.updateAccessability()">
							<label for="mag-1500">1500%</label>
						</div>
						<div class="flex-item">
							<input type="radio" name="magnificationValue" id="mag-2000" value="2000" onchange="aria.widget.slider.updateAccessability()">
							<label for="mag-2000">2000%</label>
						</div>
						<div class="flex-item">
							<input type="radio" name="magnificationValue" id="mag-2500" value="2500" onchange="aria.widget.slider.updateAccessability()">
							<label for="mag-2500">2500%</label>
						</div>
						<div class="flex-item">
							<input type="radio" name="magnificationValue" id="mag-3000" value="3000" onchange="aria.widget.slider.updateAccessability()">
							<label for="mag-3000">3000%</label>
						</div>
						<div class="flex-item">
							<input type="radio" name="magnificationValue" id="mag-3500" value="3500" onchange="aria.widget.slider.updateAccessability()">
							<label for="mag-3500">3500%</label>
						</div>
					</div>

				</div>
			</div>
			<div class="col-sm-6">
					<div class="form-group">
						<label id="setSaturation">Saturation</label>
						<div class="aria-widget-slider">
							<div class="rail">
								<input type="slider" name = "set saturation" id="setSaturationValue" class="thumb" aria-valuemin="0" aria-valuenow="100" aria-valuemax="400"
									aria-labelledby="setSaturation">
							</input>
						</div>
						<div class="value">0
						</div>
					</div>
			</div>
			<div>
				<p>
					<input type="checkbox" id="setInvert" aria-labelledby="setInvert"
							onchange="aria.widget.slider.updateAccessability()" value="" name='invert'>
					<label for="setInvert">Invert</label>
				</p>
				<p>
					<input type="checkbox" id="setGrayscale" aria-labeledby="grayscale"
							onchange="aria.widget.slider.updateAccessability()" value="" name = 'grayscale'>
							<label for="setGrayscale">Grayscale</label>
				</p>
				<p>
					<input type="checkbox" id="setMeSpeak" aria-labeledby="setMeSpeak" 
							onchange="displaySpeakVariants()" value="" name='text to speech'>
							<label for="setMeSpeak">Text-to-Speech</label>
			    </p>
			</div>
		</div>
	</div>
	
<!--	<div class='row'> -->
		<div id='speakVariants'>
        
            <div class="form-group">
                 <input type="checkbox" id="setSpeakAllText" aria-labeledby="setSpeakAllText" onchange="" value="" name='speak all text on page'>
						  <label for="setSpeakAllText">Speak all text on page</label>
            </div>
	
			<div class="form-group">
				<label id="setSpeed">Screen Reader Speed</label>
				<div class="aria-widget-slider">
					<div class="rail">
						<input type="slider" name = "set speed" id="setSpeedValue" class="thumb" aria-valuemin="0" aria-valuenow="175" aria-valuemax="400"
								aria-labelledby="setSpeed">
					     </input>
				     </div>
				     <div class="value">0
			         </div>
			    </div>
             </div>
			
			<div class="form-group">
				<label id="setVariant">Screen Reader Variant</label>
				<div class="flex-container flex-magnification-radios">
					<div class="flex-item">
							<input type="radio" name="set screen reader variant" id="f1_var" value="f1" onchange="aria.widget.slider.updateAccessability()">
							<label for="f1_var">female 1</label>
					</div>
					<div class="flex-item">
							<input type="radio" name="set screen reader variant" id="f2_var" value="f2" onchange="aria.widget.slider.updateAccessability()">
							<label for="f2_var">female 2</label>
					</div>
                    <div class="flex-item">
							<input type="radio" name="set screen reader variant" id="f3_var" value="f3" onchange="aria.widget.slider.updateAccessability()">
							<label for="f3_var">female 3</label>
					</div>
                      <div class="flex-item">
							<input type="radio" name="set screen reader variant" id="f4_var" value="f4" onchange="aria.widget.slider.updateAccessability()">
							<label for="f4_var">female 4</label>
					</div>
                    <div class="flex-item">
							<input type="radio" name="set screen reader variant" id="f5_var" value="f5" onchange="aria.widget.slider.updateAccessability()">
							<label for="f5_var">female 5</label>
					</div>
					<div class="flex-item">
							<input type="radio" name="set screen reader variant" id="m1_var" value="m1" onchange="aria.widget.slider.updateAccessability()">
							<label for="m1_var">male 1</label>
					</div>
					<div class="flex-item">
							<input type="radio" name="set screen reader variant" id="m2_var" value="m2" onchange="aria.widget.slider.updateAccessability()">
							<label for="m2_var">male 2</label>
					</div>
                    <div class="flex-item">
							<input type="radio" name="set screen reader variant" id="m3_var" value="m3" onchange="aria.widget.slider.updateAccessability()">
							<label for="m3_var">male 3</label>
					</div>
                            <div class="flex-item">
							<input type="radio" name="set screen reader variant" id="m4_var" value="m4" onchange="aria.widget.slider.updateAccessability()">
							<label for="m4_var">male 4</label>
					</div>
                            <div class="flex-item">
							<input type="radio" name="set screen reader variant" id="m5_var" value="m5" onchange="aria.widget.slider.updateAccessability()">
							<label for="m5_var">male 5</label>
					</div>
				</div>
			</div>
		</div>
	</div>
    
             <div class="form-group">
              	 <p>
					<input type="checkbox" id="setKeyboard" aria-labeledby="set keyboard" 
					 onchange="displayKeyboardOptions()" value="" name='keyboard'>
				     <label for="setKeyboard">Set keyboard options</label>
			    </p>
             </div>
             
     
			 <div id='keyboardVariants'>
                 <div class="form-group">
				    <label id="setKeyboardVariant"></label>
                       <div class="flex-container flex-magnification-radios">
					        <div class="flex-item">
							     <input type="radio" name="set keyboard options" id="key1_var" value="key1" onchange="aria.widget.slider.updateAccessability()">
							     <label for="key1_var">Speak key pressed</label>
					        </div>
					       <div class="flex-item">
							    <input type="radio" name="set keyboard options" id="key2_var" value="key2" onchange="aria.widget.slider.updateAccessability()">
							    <label for="key2_var">Speak word typed</label>
					       </div>
				     </div>
			     </div>
            </div>
	
			<div class="row">
				<div class="col-sm-12">
					<label id="setColorScheme">Color Scheme</label>
				</div>
			</div>
			<div class="row colorSchemeOptions">
				<div class="col-sm-3">
					<div class="radio">
						<input type="radio" name="colorScheme" id="grayOnWhite" value="grayOnWhite" checked="checked"
									onchange="switchColorScheme('style')">
						<label for="grayOnWhite"><span class="colorScheme grayOnWhite text-center">Gray on White</span></label>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="radio">
						<input type="radio" name="colorScheme" id="blueOnWhite" value="blueOnWhite"
									onchange="switchColorScheme('blueOnWhite')">
						<label for="blueOnWhite"><span class="colorScheme blueOnWhite text-center">Blue on White</span></label>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="radio">
						<input type="radio" name="colorScheme" id="yellowOnBlack" value="yellowOnBlack"
									onchange="switchColorScheme('yellowOnBlack')">
						<label for="yellowOnBlack"><span
									class="colorScheme yellowOnBlack text-center">Yellow on Black</span></label>
					</div>
				</div>
				<div class="col-sm-3">
						<div class="radio">
							<input type="radio" name="colorScheme" id="greenOnBlack" value="greenOnBlack"
										onchange="switchColorScheme('greenOnBlack')">
							<label for="greenOnBlack"><span class="colorScheme greenOnBlack text-center">Green on Black</span></label>
						</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<button class="btn btn-default btn-left" onclick="setDefault()">Reset</button>
					<button class="btn btn-success pull-right" onclick="saveSettings()">Save Settings</button>
				</div>
			</div>
		</div><!--FORM END -->
	</div>
</div>
