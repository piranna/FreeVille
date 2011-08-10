var Engine = Class.create(
{
	initialize: function(element, cellW,cellH)
	{
//		element.draggable();

		this.element = element;

		this.load(cellW,cellH)
	},

	load: function(cellW,cellH)
	{
		var that = this
		new Ajax.Request('/villes',
		{
			method:'get',
			onSuccess: function(transport)
			{
				var villes = transport.responseText.evalJSON()

				if(villes.length > 1)
					alert(villes)
//					alert("support for multiple user villes is not implemented")
				else
					that.ville = new Ville(villes[0], that.element, cellW,cellH)
			}
		})
	}
});