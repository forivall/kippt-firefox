var self = require('sdk/self');
var selection = require('sdk/selection');
var tabs = require('sdk/tabs');
var widget = require('sdk/widget').Widget;
var panel = require('sdk/panel').Panel;

exports.main = function() {
    var selectedText = {text: '', tabUrl: null};
    
    function selectionChanged(event){
        selectedText.text = selection.text;
        selectedText.tabUrl = tabs.activeTab.url;
    }
    
    selection.on('select', selectionChanged);
    
    var kipptPanel = panel({
        width: 450,
        height: 240,
        contentURL : self.data.url('blank.html'),
        onHide: function(){ kipptPanel.contentURL = self.data.url('blank.html'); }
    });
    
    widget({
       id: 'kippt',
       label: 'Kippt it',
       contentURL: self.data.url("icon.png"),
       panel: kipptPanel,
       onClick: function(){
       var text = tabs.activeTab.url == selectedText.tabUrl ? selectedText.text : '';
        
        kipptPanel.contentURL = "https://kippt.com/extensions/new/?"
                                + "url="     + encodeURIComponent(tabs.activeTab.url)
                                + "&title="  + encodeURIComponent(tabs.activeTab.title)
                                + "&notes="  + encodeURIComponent(text)
                                + "&source=firefox";
       }
    });
    
};
