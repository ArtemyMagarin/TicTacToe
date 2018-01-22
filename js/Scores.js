function Scores() {
	this.xScore = 0;
	this.oScore = 0;
}

Scores.prototype.getScores = function() {
	return {
		'1': this.xScore, 
	   '-1': this.oScore
	}
};

Scores.prototype.getHtmlTableScores = function() {
	res =   '<table>'+
				'<tr>'+
					'<td>'+'Крестики'+'</td>'+
					'<td>'+this.xScore+'</td>'+
				'</tr>'+
				'<tr>'+
					'<td>'+'Нолики'+'</td>'+
					'<td>'+this.oScore+'</td>'+
				'</tr>'+
			'</table>';

	return res
};

Scores.prototype.updateScore = function(winner) {
	if (winner==1) {
		this.xScore++
	} else {
		this.oScore++
	}

};

// for (let i=0; i<matrix.length; i++) {
// 	d = []
// 	for (let j=i; j>=0; j--) {
// 		d.push(matrix[i][j]);
// 	}
// 	console.log(d)
// 	d=[]
// 	if (i!=matrix.length-1) {
// 		for (let j=i; j>=0; j--) {
// 			d.push(matrix[matrix.length-i-1][matrix.length-j-1]);
// 		}
// 		console.log(d)
// 	}
// }

// var bt1 = 0, bt2 = 0
//     for (var a = table_size-2; a >= 0; a— ) {
//       for (var i = 0; i < table_size - a; i++) {
//         bt1 = check(game_table[i][table_size-i+a], before_type);
//         if (a != 0) {
//           bt2 = check(game_table[table_size-i+a][i], before_type);          
//         }  
//       }
//       bt1 = 0;
//       bt2 = 0;
//     }