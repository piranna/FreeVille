var Cells = Class.create(
{
	initialize: function(element, rows,columns, cellW,cellH)
	{
//		element.draggable();

		this.element = element;

		this.rows = rows;
		this.columns = columns;

		this.cellW = cellW;
		this.cellH = cellH;
	},

	load: function(data)
	{
		var cellH = data.cells.length;
		var cellW = data.cells[0].length;

		for(var y=0; y<cellH; y++)
			for(var x=0; x<cellW; x++)
			{
				var tile = null;

				var cell = data.cells[y][x];
				if(cell < 0) continue;

				switch(cell)
				{
					case 1:	tile = new Tile("content/tiles/house.png", 2,2);			break;
					case 2:	tile = new Tile("content/tiles/building-medium.png", 3,3);	break;
					case 3:	tile = new Tile("content/tiles/building-generic.png", 4,4);	break;
				};

				if(!tile)
					tile = new Tile("content/tiles/grass.png", 1,1);

				this.put(tile, x,y);
			}
	},

	put: function(tile, coorX,coorY)
	{
		var element = tile.element;
//			element.setAttribute("width", this.cellW);
//			element.setAttribute("height", this.cellH);
			element.style.bottom   = this.cellH*((this.rows-coorY-coorX+this.columns)/2-1) + "px";
			element.style.left     = this.cellW* (this.rows-coorY+coorX-tile.width)/2      + "px";
			element.style.position = "absolute";

			element.addEventListener("click",this.onClick);

			element.coorX = coorX;
			element.coorY = coorY;

		this.element.appendChild(element);
	},

	onClick: function()
	{
		if(currentTool)
		{
			var parent = this.parentNode;
			var coorX = this.coorX;
			var coorY = this.coorY;

			// Remove old tile, put new one, set tool to null and disable it if we can't be able to use it anymore
			parent.removeChild(this);
			map.put(new Tile("content/tiles/"+currentTool+".png", 2,2), coorX,coorY);
			currentTool = null;
		}
	}
});