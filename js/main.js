var player, game_table;
var table_size = 15;
var scores = new Scores();

var gamemod = 1;

$(function() {
	$(document).on('click', 'td', turn);
})

	function print_turn (player) {
		$("#turn").html("Сейчас ходит: " + type_of_cell(player));
	}

	function new_game(mod) {
		gamemod = mod;

		$("#menu").addClass('hide');
		$("#gameboard").removeClass('hide');
		$("#timer").text("");

		player = 1;

		game_table = [];

		for (var i = 0; i<table_size; i++) {
			var row = [];
			for (var j = 0; j<table_size; j++) {
				row[j] = 0;
			}
			game_table[i] = row;
		}

		var table = $("#game_table");		
		$("#game_table").html("");

		for (var y = 0; y < table_size; y++) {
			let tr = document.createElement('tr');
			for (var x = 0; x < table_size; x++) {
				let td = document.createElement('td');
				td.setAttribute('data-x', x);
				td.setAttribute('data-y', y);
				tr.append(td);		
			}
			table.append(tr);
		}

		print_turn(player)

		if (mod==2) {
			seconds = 60;
			$("#timer").text("Осталось "+seconds+" c");
	        seconds_timer_id = setInterval(function() {
	            if (seconds > 0) {
	                seconds --;
	                if (seconds < 10) {
	                    seconds = "0" + seconds;
	                }
	                $("#timer").text("Осталось "+seconds+" c");
	            } else {
	                clearInterval(seconds_timer_id);   

	                (function() {
	                	x_points = 0;
	                	y_points = 0;
	                	
	                	count_winner();
	                	winner = (x_points - y_points)/Math.abs((x_points - y_points))
	                	gameOver([], winner)
	                })()
	        		
	            } 
	        }, 1000);
		}
	}


	function turn(event) {
		x = $(event.target).attr('data-x');
		y = $(event.target).attr('data-y');

		if (!game_table[y][x]) {			
			game_table[y][x] = player;
			render_turn(x, y, player);

			player = -player;
			print_turn(player);
		}
		
		if (gamemod==1) {
			cw = getCoordsWinner(game_table);
			if (cw) {
				gameOver(cw[0], cw[1])
			}		
		}			
	}

	function render_turn(x, y, player) {
		$("td[data-x='"+x+"'][data-y='"+y+"']").html(type_of_cell(player))
	}


	function type_of_cell(p) {
		return p?~p?"X":"O":""
	}


	function gameOver(coords, winner) {

		coords.forEach((item)=>{
			$("td[data-x='"+item[1]+"'][data-y='"+item[0]+"']").addClass('winner');
		})

		if (winner) {
			scores.updateScore(winner);
		}
		
		showWinner(winner)


	}		

	function showWinner(winner, score) {
		setTimeout(function() {
			$("#gameboard").addClass("hide");
			$("#menu .title").html("Победил "+(type_of_cell(winner)||"никто")+"!");
			$("#menu .score").html(scores.getHtmlTableScores());
			$("#menu").removeClass("hide");
        }, 1200);
	}

	function count_winner() {
		var before_type=0;

		// проход по строкам
		for (var i = 0; i < table_size; i++) {
			for (var j = 0; j < table_size; j++) {
				before_type = check(game_table[i][j], before_type);	
			}
			before_type = 0;
		}

		// проход по столбцам
		for (var i = 0; i < table_size; i++) {
			for (var j = 0; j < table_size; j++) {
				before_type = check(game_table[j][i], before_type);	
			}
			before_type = 0;
		}

		// проход по левым диагоналям
		var bt1 = 0, bt2 = 0
		for (var a = table_size-2; a >= 0; a-- ) {
			for (var i = 0; i < table_size - a; i++) {
				bt1 = check(game_table[i][i+a], bt1);
				if (a != 0) {
					bt2 = check(game_table[i+a][i], bt2);					
				}	
			}
			bt1 = 0;
			bt2 = 0;
		}

		// проход по правым диагоналям
		var before_type = 0
		for (var a = table_size-2; a >= 0; a-- ) {
			for (var i = 0; i < table_size - a; i++) {				
				before_type = check(game_table[i][table_size-i-a-1], before_type);
			}
			before_type = 0;			
		}

	    console.log(x_points + " : " +y_points);
	}

	function check(current_item, before_type) {
		if (current_item != before_type) {
			before_type = current_item;
		} else {
			if (current_item == 1) {
				x_points += 1;
			} else if (current_item == -1) {
				y_points += 1;
			}
		}
		return before_type;
	}