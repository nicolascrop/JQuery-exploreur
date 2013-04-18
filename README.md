JQuery-exploreur
================

Display a folder from a JSON format
How to use: 
Add required js files(jquery-1.8.3.min.js and jquery.exploreur-1.0.js)
create a div (here explorateur)
Create : expl = $("#explorateur").explorer(); for exemple version or 
expl = $("#explorateur").explorer({
  ur data in JSON format
});

exemple of data:
explData: {
  				"name": "root",
					"description":"This is a description",
					"items":
					{
						"folders":
						[
							{
								"name":"Pictures1",
								"description":"folder of picture",
								"items":
								{
									"files":
									[
										{"name":"file4.jpg", "description":"Picture of me roaming", "link":"#"},
										{"name":"file5.bmp", "description":"Picture of me coding", "link":"#"},
										{"name":"file6.png", "description":"Picture of me sleeping", "link":"#"},
									]
								}
							},
							{
								"name":"Pictures2",
								"description":"folder of picture",
								"items":
								{
									"files":
									[
										{"name":"file4.jpg", "description":"Picture of me roaming", "link":"#"},
										{"name":"file5.bmp", "description":"Picture of me coding", "link":"#"},
										{"name":"file6.png", "description":"Picture of me sleeping", "link":"#"},
									]
								}
							},
						],
						"files":
						[
							{"name":"file1.pdf", "description":"Picture of me snoozing", "link":"#"},
							{"name":"file2.doc", "description":"Picture of me jumping", "link":"#"},
							{"name":"file3.jpg", "description":"Picture of me eating", "link":"#"},
						]
					}
				},
