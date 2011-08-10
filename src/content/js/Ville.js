var Ville = Class.create(
{
	initialize: function(villeKey, element, cellW,cellH)
	{
//		element.draggable();

		this.key = villeKey
		this.element = element;

		this.ground  = new Layer("ground",  villeKey, element, cellW,cellH)
		this.objects = new Layer("objects", villeKey, element, cellW,cellH)
	},

	put: function(tool, x,y)
	{
		var type = this.objects.scheme.types[tool]

		var ground = type.ground
		if(ground != undefined)
		{
			var tile = this.ground.scheme.tiles[ground]
			tile = new VilleTile(tile, this.ground.scheme.types[tile])
			this.ground.putTile(tile, x,y)
		}

		this.objects.putObject(new VilleObject(type), x,y)
	}
});