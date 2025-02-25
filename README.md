# modPopStrap
Programmatically invoke Bootstrap (5.3) modal popups

## syntax

```
modal=new modPopStrap(config);
modal.create(uniqueid);
modal.show();
modal.hide();
modal.dispose();  // hide and remove from the DOM
```

## configuration example
You don't have to specify such a large config - many settings have defaults. This is just an example to show the configurable parameters.
```
{
	"closeable":true,              		// default: true  - a close button will be displayed that will hide the modal
	"size":"sm",                   		// default is md
	"fade":true,                   		// default is true - the modal will fade in and out 
	"keyboard":false,              		// default is true - pressing esc on keyboard will hide the modal
	"backdrop":"static",           		// default is true - the modal will have a backdrop and clicking outside will hide the modal.
	"focus":true,				// default is true - the start of the modal will gain focus
	"title":				// modal title content
	{
		"icon":"exclamation-circle",	// requires Bootstrap icons.
		"text":"Warning!",
		"colourscheme":"danger",	// uses Bootstrap 5.3 text-bg- helpers to set background and appropriate foreground
	},
	"content":				// modal body content
	{
		"contentType":"file",		// or "contentType":"html",
		"ajaxURL":"ajax.php"		// or "content":"Content to display in modal body",
		"ajaxMethod":"POST"		// default is POST
	},
	"footer":                      		// modal footer content
	{
		"type":"buttons",		// or "type":"html
		"detail":			// if type="html" detail is html code or plain text
		[
			{
				"label":"Yes",
				"colour":"success",
				"action":function() { alert("You clicked OK"); }
				},{
				"label":"No",
				"colour":"danger",
				"action":function() {  alert("You clicked No"); }
				},{
				"label":"Cancel",
				"colour":"primary",
				"action":function() {  mymodal.dispose() }
			}
		]
	},
	"events":                     		  // attach custom actions to Bootstrap standard events
	{
		"onhide":function() { console.log("Hiding"); },
		"onhidden":function() { console.log("Hidden"); },
		"onprevented":function() { console.log("Prevented"); },
		"onshow":function() { console.log("Showing"); },					
		"onshown":function() { console.log("Shown"); }
	}
}
```

