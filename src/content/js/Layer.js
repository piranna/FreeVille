var Layer = Class.create(
{
	initialize: function(type, ville, element, cellW,cellH)
	{
		this.type  = type
		this.ville = ville

		this.element = element
		this.cellW   = cellW
		this.cellH   = cellH

		this.load()
	},

	load: function()
	{
		var that = this
		new Ajax.Request('/'+that.type,
		{
			method: 'get',
			parameters: {ville: that.ville},
			onSuccess: function(transport)
			{
				var data = transport.responseText.evalJSON()

				that.scheme = data.scheme

				// Ground
				if(data.ground != undefined)
				{
					that.rows    = data.ground.length;
					that.columns = data.ground[0].length;

					that.ground = Array(that.rows)
					for(var y=0; y<that.rows; y++)
					{
						that.ground[y] = Array(that.columns);
						for(var x=0; x<that.columns; x++)
						{
							var cell = data.ground[y][x];

							var tile = null
							if(cell != null && cell >= 0)
							{
								tile = that.scheme.tiles[cell]
								tile = new VilleTile(tile, that.scheme.types[tile.type]);
							}

							that.putTile(tile, x,y);
						}
					}
				}

				// Objects
				else
				{
					var numObjects = data.objects.length

					that.objects = Array(16)
					for(var y=0; y<16; y++)
					{
						that.objects[y] = Array(16)
						for(var x=0; x<16; x++)
							that.objects[y][x] = null
					}

					for(var i=0; i<numObjects; i++)
					{
						var object = data.objects[i]
						var x = object.x
						var y = object.y

						object = new VilleObject(that.scheme.types[object.type],
												 object.state);

						that.putObject(object, x,y);
					}
				}
			}
		})
	},

	putTile: function(tile, x,y)
	{
		// Remove old tile
		var cell = this.ground[y][x]
		if(cell != null)
			this.element.removeChild(cell.element);

		// Add new one
		this.ground[y][x] = tile

		if(tile)
		{
			var element = tile.element
				element.style.position = "absolute";
				element.style.bottom   = this.cellH*((this.rows-y-x+this.columns)/2-1) + "px";
				element.style.left     = this.cellW* (this.rows-y+x-1)/2               + "px";
	
			this.element.appendChild(element)
		}
	},

	putObject: function(object, x,y)
	{
		// Remove old tile
		var cell = this.objects[y][x]
		if(cell != null)
			this.element.removeChild(cell.element);

		// Add new one
		this.objects[y][x] = object

		if(object)
		{
			var element = object.element
				element.style.position = "absolute";
				element.style.bottom   = this.cellH*((16-y-x+16)/2-1) + "px";
				element.style.left     = this.cellW* (16-y+x-1)/2 -32               + "px";
				element.style.zIndex = x+y
	
			this.element.appendChild(element)
		}
	}
})