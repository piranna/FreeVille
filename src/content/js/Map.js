var Map = Class.create(
{
	initialize: function(element, columns,rows, cellW,cellH)
	{
//		element.draggable();

		this.element = element;

		this.columns = columns;
		this.rows = rows;

		this.cellW = cellW;
		this.cellH = cellH;
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
			map.put(new Tile("content/tiles/house.png", 2,2), coorX,coorY);
			currentTool = null;
		}
	}
});