# link
  * api.slack.com

  * Teamcity Document
    * https://confluence.jetbrains.com/display/TCD18/TeamCity+Documentation
  * teamcity slack plugin
    * https://github.com/alexkvak/teamcity-slack/releases
  * teamcity node builder plugin
    * https://github.com/jonnyzzz/TeamCity.Node
  

# Case1
* Create New app
* Setting Incomming Webhooks
and then

```sh
$ curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' https://hooks.slack.com/services/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
```

* output: send message to channel

# Case2 : Install and Running Teamcity
* Download Teamcity
  * https://www.jetbrains.com/teamcity/download/#section=section-get
* Extract
* paste jre 1.8 in `Teamcity/jre`
  * expected folder directory `Teamcity/jre/Home`, `Teamcity/jre/MacOS`, `Teamcity/jre/info.plist`
* run Teamcity
  * `./runAll.sh start` in `bin` folder
  * https://confluence.jetbrains.com/display/TCD18/Installation+Quick+Start#InstallationQuickStart-onLinuxandOSX
* default url is `localhost:8111`


# Teamcity x Slack
* follow this guidline.
  * https://github.com/alexkvak/teamcity-slack#install-plugin





# Teamcity

### Delete project
