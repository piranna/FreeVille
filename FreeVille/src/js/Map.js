var Map = Class.create(
{
	initialize: function(element, columns,rows, cellW,cellH)
	{
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

		this.element.appendChild(element);
	}
});