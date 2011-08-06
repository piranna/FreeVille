var Tile = Class.create(
{
	initialize: function(src, width,height)
	{
		this.width = width;
		this.height = height;

		var element = document.createElement("img");
			element.setAttribute("src", src);

			element.addEventListener("mouseover", this.onMouseOver);
			element.addEventListener("mouseout", this.onMouseOut);

		this.element = element;
	},

	onMouseOver: function()
	{
		this.style.outline = "#0000FF dotted thin";
	},

	onMouseOut: function()
	{
		this.style.outline = "";
	}
});