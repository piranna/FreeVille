function Load()
{
	// Engine
	engine = new Engine(document.getElementById("cells"), 64,36)
	new Ajax.Request('/ville',
	{
		method:'get',
		onSuccess: function(transport)
		{
			engine.load(transport.responseText.evalJSON())
		}
	});

//	LoadPunctuation();
//	LoadTasks();

	// Dock
	dock = new Dock();
}


//window.addEventListener("load", Load);