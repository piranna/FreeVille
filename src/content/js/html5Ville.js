function document_OnLoad()
{
	LoadCells();
//	LoadPunctuation();
//	LoadTasks();
}

function LoadCells()
{
	var map = new Map(document.getElementById("cells"), 16,16, 64,36);

	var cells = ;

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
				tile = new Tile("tiles/grass.png", 1,1);

			map.put(tile, x,y);
		}
}


//window.addEventListener("load", document_OnLoad);