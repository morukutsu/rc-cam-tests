/**
* Basic tests for react-native-camera
*/
'use strict';

var React = require('react-native');
var Camera = require('react-native-camera');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Navigator
} = React;

var rncamtests = React.createClass({
    getInitialState: function() {
        return {
            isMounted: true,
        }
    },

    configureScene: function(route) {
        let sceneConfig;

        if (route.index == 0 ) {
            sceneConfig = Navigator.SceneConfigs.FloatFromRight;
        } else if (route.index == 1) {
            sceneConfig = Navigator.SceneConfigs.FloatFromLeft;
        }

        return sceneConfig;
    },

    toggleMount: function() {
        this.setState({
            isMounted: !this.state.isMounted
        });
    },

    goToCameraScene: function() {
        this.refs.navigator.push({
            name: 'camera',
            index: 1,
        });
    },

    goBackToWelcomeScene: function() {
        this.refs.navigator.pop();
    },

    renderScene: function(route, navigator) {
        if (route.index == 0) {
            // Welcome screen
            // + tests that we can go (push) to the Camera scene, come back to the Welcome screen (pop)
            //   and go back again to the Camera scene (push)
            //   the pop operation should unmount the Camera scene thus, having the same behavior
            //   "Mount / Unmount" button
            return (
                <View style={styles.container}>
                    <TouchableHighlight onPress={() => this.goToCameraScene()}>
                        <Text style={styles.buttonText}>
                            Go to Camera Scene
                        </Text>
                    </TouchableHighlight>
                </View>
            );
        } else if (route.index == 1) {
            // Ccreen showing the camera and a button to mount or unmount the component
            // + tests that the component can be properly unmounted without crashing
            //   and still working when mounted again
            return (
                <View style={styles.container}>
                    <View style={styles.camera}>
                        { this.state.isMounted ? <Camera style={styles.camera}/> : null }
                    </View>

                    <TouchableHighlight onPress={() => this.toggleMount()}>
                        <Text style={styles.buttonText}>
                            Mount/Unmount
                        </Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.goBackToWelcomeScene()}>
                        <Text style={styles.buttonText}>
                            Go back
                        </Text>
                    </TouchableHighlight>
                </View>
            );
        }
    },

    render: function() {
        return (
            <Navigator
                initialRoute={{name: 'welcome', index: 0}}
                ref='navigator'
                renderScene={this.renderScene}
                configureScene={this.configureScene}
            />
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    camera: {
        width: 320,
        height: 320
    },

    buttonText: {
        fontSize: 25,
        margin: 10
    }
});

AppRegistry.registerComponent('rncamtests', () => rncamtests);
