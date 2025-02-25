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
		var container=$("body").prepend(`<div id="${this.id}" class="modal ` + ((this.config.fade) ? "fade" : "") + `"` + ( typeof this.config.keyboard=="undefined" || (this.config.keyboard) ? ` data-bs-keyboard="true"` : `data-bs-keyboard="false" `) + ( typeof this.config.focus=="undefined" || (this.config.focus) ? ` data-bs-focus="true"` : `data-bs-focus="false" `) + ((typeof this.config.backdrop!="undefined" || this.config.backdrop) ? ` data-bs-backdrop="`+(this.config.backdrop)+`"` : `data-bs-backdrop="false" `) + ` tabindex="-1" role="dialog"><div class="modal-dialog `+ ((typeof this.config.size=="undefined" || this.config.size=="md") ? `` : `modal-${this.config.size}`) + `" role="document"><div class="modal-content"></div></div></div>`); 
		console.log(this.config);
		if(this.config.title || this.config.closeable)
		{
			console.log(this.config.title);
			var colour="";
			if(typeof this.config.title.colourscheme!="undefined")
			{
				colour=` text-bg-`+this.config.title.colourscheme;
			}
			container.find(".modal-content").append(`<div class="modal-header` + colour + `"></div>`);
			if(this.config.title)
			{
				if(this.config.title.icon)
				{
					container.find(".modal-header").append(`<i class="fs-5 me-2 bi bi-${this.config.title.icon}"></i>`);
				}
				if(this.config.title.text)
				{
					container.find(".modal-header").append(`<h1 class="flex-grow-1 fs-5 modal-title">${this.config.title.text}</h1>`);
				}
			}
			if(this.config.closeable)
			{
				container.find(".modal-header").append(`<button style="color:inherit" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`);
			}
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
				$(`#${this.id}`).on("hide.bs.modal",function() { that.onhide(); } );
			}
			if(typeof this.config.events.onhidden=="function")
			{
				$(`#${this.id}`).on("hidden.bs.modal",function() { that.onhidden(); } );
			}
			if(typeof this.config.events.onshow=="function")
			{
				$(`#${this.id}`).on("show.bs.modal",function() { that.onshow(); } );
			}
			if(typeof this.config.events.onshown=="function")
			{
				$(`#${this.id}`).on("shown.bs.modal",function() { that.onshown(); } );
			}
			if(typeof this.config.events.onprevented=="function")
			{
				$(`#${this.id}`).on("hidePrevented.bs.modal",function() { that.onprevented(); } );
			}
		}
	}
	content(contentconfig)
	{
		if(contentconfig.contentType=="html")
		{
			$(`#${this.id} .modal-content`).append(`<div class="modal-body">${contentconfig.content}</div>`);
		}
		else
		{
			this.getajaxcontent(contentconfig);
		}
	}
	getajaxcontent(ajaxconfig)
	{
		var that=this;
		$(`#${that.id} .modal-content`).append(`<div class="modal-body"></div>`);
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
				$(`#${that.id} .modal-content .modal-body`).append(`${response}`);
			}).fail(function(e)
			{
				console.log("The request returned an error : " + e.error);
			});
	}
	footer(footerconfig)
	{
		if(footerconfig.type=="buttons")
		{
			var that=this;	
			$(`#${this.id} .modal-content`).append(`<div class="modal-footer"></div>`);
			$(footerconfig.detail).each(function(a,b)
				{
					$(`#${that.id} .modal-footer`).append(`<button class="btn btn-${b.colour}">${b.label}</button>`);
					if(typeof b.action=="function")
					{
						$(`#${that.id} .modal-footer .btn`).last(".btn").on("click",function() { b.action(); });
					}
				});
		}
		else
		{
			$(`#${this.id} .modal-content`).append(`<div class="modal-footer">${footerconfig.detail}</div>`);
		}
	}
	show()
	{
		$(`#${this.id}`).modal("show");
	}
	hide()
	{
		$(`#${this.id}`).modal("hide");
	}
	dispose(refresh)
	{
		this.hide();
		var id=this.id
		setTimeout(function() {
			$(`#${id}`).remove();
		},300);
		if(refresh)
		{
			var that=this;
			setTimeout(function() { that.create(that.id); },600);
		}
	}
}
