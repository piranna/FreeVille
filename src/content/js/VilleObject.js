// A tile is a combination of a ground area and (maybe) an object

var VilleObject = Class.create(
{
	initialize: function(type, state)
	{
		this.width = type.w;
		this.height = type.h;

		this.state = state

		this.element = document.createElement("img");
		this.element.setAttribute("src", "content/objects/"+type.image);

//		this.element.style.position = "absolute"
//		this.element.style.bottom = "0px"
//		this.element.style.left = "-32px"

//		this.element.addEventListener("mouseover", this.onMouseOver);
//		this.element.addEventListener("mouseout", this.onMouseOut);
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