class modPopStrap
{
	constructor(config)
	{
		this.config=config
	}
	create(id)
	{
		if(typeof id=="undefined")
		{
			console.log("A unique ID is required");
			return false;
		}
		if($(`#${id}`).length>0)
		{
			this.dispose(true);
			console.log("Disposing as already exists");
			return false;
		}
		this.id=id;
		$("body").prepend(`<div id="${this.id}" class="modal ` + ((this.config.fade) ? "fade" : "") + `"` + ( typeof this.config.keyboard=="undefined" || (this.config.keyboard) ? ` data-bs-keyboard="true"` : `data-bs-keyboard="false" `) + ( typeof this.config.focus=="undefined" || (this.config.focus) ? ` data-bs-focus="true"` : `data-bs-focus="false" `) + ((typeof this.config.backdrop!="undefined" || this.config.backdrop) ? ` data-bs-backdrop="`+(this.config.backdrop)+`"` : `data-bs-backdrop="false" `) + ` tabindex="-1" role="dialog"><div class="modal-dialog `+ ((typeof this.config.size=="undefined" || this.config.size=="md") ? `` : `modal-${this.config.size}`) + `" role="document"><div class="modal-content"></div></div></div>`); 
		this.container=$(`#${this.id}`);
		if(this.config.title || this.config.closeable)
		{
			this.title(this.config.title,this.config.closeable);
		}
		if(this.config.content)
		{
			this.content(this.config.content);
		}
		if(this.config.footer)
		{
			this.footer(this.config.footer);
		}
		if(this.config.events)
		{
			var that=this.config.events;
			if(typeof this.config.events.onhide=="function")
			{
				this.container.on("hide.bs.modal",function() { that.onhide(); } );
			}
			if(typeof this.config.events.onhidden=="function")
			{
				this.container.on("hidden.bs.modal",function() { that.onhidden(); } );
			}
			if(typeof this.config.events.onshow=="function")
			{
				this.container.on("show.bs.modal",function() { that.onshow(); } );
			}
			if(typeof this.config.events.onshown=="function")
			{
				this.container.on("shown.bs.modal",function() { that.onshown(); } );
			}
			if(typeof this.config.events.onprevented=="function")
			{
				this.container.on("hidePrevented.bs.modal",function() { that.onprevented(); } );
			}
		}
	}
	title(titleconfig,closeable)
	{
		
		
		if(titleconfig)
		{	
			var colour="";
			
			if("colourscheme" in titleconfig)
			{
				colour=" text-bg-"+titleconfig.colourscheme;
			}
			
			this.container.find(".modal-content .modal-header").remove();
			this.container.find(".modal-content").prepend(`<div class="modal-header` + colour + `"></div>`);
			if(titleconfig.icon)
			{
				this.container.find(`.modal-header i`).not(`.closeable`).remove();
				this.container.find(`.modal-header`).append(`<i class="align-self-start fs-5 me-2 bi bi-${titleconfig.icon}"></i>`);
			}
			if(titleconfig.text)
			{
				this.container.find(`.modal-header h1`).remove();
				this.container.find(`.modal-header`).append(`<h1 class="flex-grow-1 fs-5 modal-title">${titleconfig.text}</h1>`);
			}
			
		}
		if(closeable)
		{	
			if(this.container.find(".modal-header").length==0)
			{
				this.container.find(".modal-content").prepend(`<div class="modal-header"></div>`);
			}
			else
			{
				this.container.find(".modal-content .modal-header i.closeable").remove();
			}
			this.container.find(`.modal-header`).append(`<i  data-bs-dismiss="modal" aria-label="Close" class="closeable align-self-start ms-auto bi fs-5 bi-x-lg"></i>  `);
		}
	}	
	content(contentconfig)
	{
		this.container.find(`.modal-content .modal-body`).remove();
		if(contentconfig.contentType=="html")
		{
			this.insertcontent(contentconfig);
		}
		else
		{
			this.getajaxcontent(contentconfig);
		}
	}
	getajaxcontent(ajaxconfig)
	{
		var that=this;
		if(typeof ajaxconfig.ajaxMethod=="undefined" || ajaxconfig.ajaxMethod==null) { ajaxconfig.ajaxMethod="POST"; };
		if(typeof ajaxconfig.ajaxURL=="undefined" || ajaxconfig.ajaxURL==null)
		{
			console.log("Cannot retrieve content from an empty URL");
			return false;
		}
		var ajaxconnect={};
		ajaxconnect["method"]=ajaxconfig.ajaxMethod;
		ajaxconnect["url"]=ajaxconfig.ajaxURL;
		if(ajaxconfig.ajaxData)
		{
			ajaxconnect["data"]=ajaxconfig.ajaxData;
		}
		$.ajax(ajaxconnect).done(function(response)
			{
				ajaxconfig["type"]="html";
				ajaxconfig["content"]=response;
				that.insertcontent(ajaxconfig);
			}).fail(function(e)
			{
				console.log("The request returned an error : " + e.error);
			});
	}
	insertcontent(contentconfig)
	{
		if(this.container.find(".modal-footer").length>0)
		{
			this.container.find(`.modal-footer`).before(`<div class="modal-body">${contentconfig.content}</div>`);
		}
		else
		{
			this.container.find(`.modal-content`).append(`<div class="modal-body">${contentconfig.content}</div>`);
		}	
	}
	footer(footerconfig)
	{
		this.container.find(`.modal-content div.modal-footer`).remove();
		if(footerconfig.type=="buttons")
		{
			var that=this;	
			
			this.container.find(`.modal-content`).append(`<div class="modal-footer"></div>`);
			$(footerconfig.detail).each(function(a,b)
				{
					var buttoncolour=((typeof b.colour=="undefined") ? `` : `btn-${b.colour}`);
					that.container.find(`.modal-footer`).append(`<button class="btn ${buttoncolour}">${b.label}</button>`);
					if(typeof b.action=="function")
					{
						that.container.find(`.modal-footer .btn`).last(".btn").on("click",function() { b.action(); }.bind(that));
					}
				});
		}
		else
		{
			this.container.find(`.modal-content`).append(`<div class="modal-footer">${footerconfig.detail}</div>`);
		}
	}
	show()
	{
		this.container.modal("show");
	}
	hide()
	{
		if (document.activeElement) {
			document.activeElement.blur();
		}
		this.container.modal("hide");
	}
	dispose(refresh)
	{
		this.hide();
		var id=this.id
		setTimeout(function() {
			this.container.remove();
		},300);
		if(refresh)
		{
			var that=this;
			setTimeout(function() { that.create(that.id); },600);
		}
	}
}
