var Engine = Class.create(
{
	initialize: function(element, cellW,cellH)
	{
//		element.draggable();

		this.element = element;

		this.cellW = cellW;
		this.cellH = cellH;
	},

	load: function(data)
	{
		this.key = data.key

		this.tiles = data.tiles
		this.types = data.types

		this.loadGround(data.map)
		this.loadObjects(data)
	}

	loadGround: function(map)
	{
		this.rows = map.length;
		this.columns = map[0].length;

		this.ground = Array(this.rows)
		for(var y=0; y<this.rows; y++)
		{
			this.ground[y] = Array(this.columns);
			for(var x=0; x<this.columns; x++)
			{
				var cell = map[y][x];
				if(cell == null || cell < 0)
					this.ground[y][x] = null;
				else
				{
					var tile = this.tiles[cell]
					this.put(new Tile(tile.type, tile.image), x,y);
				}
			}
		}
	},

//	loadGround: function(data)
//	{
//		this.rows = data.cells.length;
//		this.columns = data.cells[0].length;
//
//		this.tiles = data.tiles
//		this.types = data.types
//
//		this.cells = Array(this.rows)
//		for(var y=0; y<this.rows; y++)
//		{
//			this.cells[y] = Array(this.columns);
//			for(var x=0; x<this.columns; x++)
//			{
//				var cell = data.cells[y][x];
//				if(cell == null || cell < 0)
//					this.cells[y][x] = null;
//				else
//					this.put(new Tile(this.tiles[cell].type), x,y);
//			}
//		}
//	},

	put: function(tile, x,y)
	{
		// Remove old tile
		var cell = this.ground[y][x]
		if(cell != null)
			this.element.removeChild(cell.element);

		// Add new one
		this.ground[y][x] = tile
		var element = tile.element
			element.style.position = "absolute";
			element.style.bottom   = this.cellH*((this.rows-y-x+this.columns)/2-1) + "px";
			element.style.left     = this.cellW* (this.rows-y+x-1)/2               + "px";

		this.element.appendChild(element)
	},

//	put: function(tile, coorX,coorY)
//	{
//		// Remove old tiles
//		for(var y=coorY; 0<=coorY-tile.height && coorY-tile.height<y; y--)
//			for(var x=coorX; 0<=coorX-tile.width && coorX-tile.width<x; x--)
//				if(this.cells[y][x] != undefined)
//				{
//					if(this.cells[y][x] != null)
//						this.element.removeChild(this.cells[y][x].element);
//					this.cells[y][x] = null
//				}
//
//		var element = tile.element;
////			element.setAttribute("width", this.cellW);
////			element.setAttribute("height", this.cellH);
//
////			element.style.left     = this.cellW* (this.rows-coorY+coorX-tile.width)/2      + "px";
//
//			element.addEventListener("click",this.onClick);
//
//			element.coorX = coorX;
//			element.coorY = coorY;
//
//		this.element.appendChild(element);
//	},

	onClick: function()
	// Applied to putted tiles
	{
		if(currentTool)
		{
			if(currentTool == "delete")
				new Ajax.Request('/cells',
				{
					method:'delete',
					parameters: {},

					onFailure: function()
					{
						alert("Network failure while deleting data on the server, please retry");
					}
				});

			else
				new Ajax.Request('/cells',
				{
					method:'put',
					parameters: {x: coorX,
								 y: coorY,
								 type: currentTool},

					onFailure: function()
					{
						alert("Network failure while updating data on the server, please retry");
					},

					onSuccess: function()
					{
						var coorX = this.coorX;
						var coorY = this.coorY;

						// Remove old tile, put new one, set tool to null and disable it if we can't be able to use it anymore
						engine.cells.put(new Tile(currentTool), coorX,coorY);
						currentTool = null;
					}
				});
		}
	}
});