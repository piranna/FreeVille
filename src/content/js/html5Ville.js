function document_OnLoad()
{
	LoadCells();
//	LoadPunctuation();
//	LoadTasks();
	LoadDock();
}

function LoadCells()
{
	map = new Map(document.getElementById("cells"), 16,16, 64,36);

	var cells = [[-1,-1,0,0,0,0,0,0,0, 0, 0, 0, 0,-2,-2,-2],
                 [-1, 1,0,0,0,0,0,0,0, 0, 0, 0, 0,-2,-2,-2],
                 [ 0, 0,0,0,0,0,0,0,0, 0, 0, 0, 0,-2,-2, 2],
                 [ 0, 0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0],
                 [ 0, 0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0],
                 [ 0, 0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0],
                 [ 0, 0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0],
                 [ 0, 0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0],
                 [ 0, 0,0,0,0,0,0,0,0,-3,-3,-3,-3, 0, 0, 0],
                 [ 0, 0,0,0,0,0,0,0,0,-3,-3,-3,-3, 0, 0, 0],
                 [ 0, 0,0,0,0,0,0,0,0,-3,-3,-3,-3, 0, 0, 0],
                 [ 0, 0,0,0,0,0,0,0,0,-3,-3,-3, 3, 0, 0, 0],
                 [ 0, 0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0],
                 [ 0, 0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0],
                 [-1,-1,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0],
                 [-1, 1,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0]];

	for(var y=0; y<16; y++)
		for(var x=0; x<16; x++)
		{
			var tile = null;

			var cell = cells[y][x];
			if(cell < 0) continue;

			switch(cell)
			{
				case 1:	tile = new Tile("content/tiles/house.png", 2,2);			break;
				case 2:	tile = new Tile("content/tiles/building-medium.png", 3,3);	break;
				case 3:	tile = new Tile("content/tiles/building-generic.png", 4,4);	break;
			};

			if(!tile)
				tile = new Tile("content/tiles/grass.png", 1,1);

			map.put(tile, x,y);
		}
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