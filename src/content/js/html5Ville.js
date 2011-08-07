function document_OnLoad()
{
	new Ajax.Request('/cells',
	{
		method:'get',
		onSuccess: function(transport)
		{
			LoadCells(transport.responseText.evalJSON());
		}
	});
//	LoadPunctuation();
//	LoadTasks();
	LoadDock();
}

function LoadCells(data)
{
	var cellH = data.cells.length;
	var cellW = data.cells[0].length;

	cells = new Cells(document.getElementById("cells"), cellH,cellW, 64,36);
	cells.load(data)
}


function LoadDock()
{
	currentTool = null;
}

function setCurrentTool(tool)
{
	currentTool = tool;
}


//window.addEventListener("load", document_OnLoad);