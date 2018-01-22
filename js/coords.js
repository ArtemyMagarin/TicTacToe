// matrix = [
// 	[0,1,1,1,1,0],
// 	[0,0,0,0,0,-1],
// 	[0,0,0,0,0,-1],
// 	[0,0,0,0,0,-1],
// 	[0,0,0,0,0,-1],
// 	[0,0,0,0,0,-1],
// ]


function getCoordsWinner(matrix) {
	function getCoords5x5(matrix) {
		var res;

		matrix.forEach((item, i)=>{
			sum = item.reduce((last, item)=>{return last+=item}, 0);
			if (sum==5 || sum==-5) {
				res = [[i, 0], [i, 1], [i, 2], [i, 3], [i, 4]]
			};

		})

		if (res) {return res};

		for (let i = 0; i<5; i++) {
			s = 0;
			for (let j = 0; j<5; j++) {
				s+=matrix[j][i];
			}
			if (s==5 || s==-5) {
				return [[0, i], [1, i], [2, i], [3, i], [4, i]]
			}
		}

		s = 0;
		s2 = 0;

		for (let i = 0; i<5; i++) {
			s += matrix[i][i]
			s2 += matrix[i][4-i]
		}

		if (s==5 || s==-5) {
			return [[0, 0], [1,1], [2,2], [3,3], [4,4]]
		}

		if (s2==5 || s2==-5) {
			return [[0, 4], [1,3], [2,2], [3,1], [4,0]]
		}

		return false
	}

	function getCoords(bigMatrix) {
		size = bigMatrix.length;
		block = 5;

		for (let i = 0; i<=size-block; i++) {
			for (let j = 0; j<=size-block; j++) {
				coords = getCoords5x5(bigMatrix.slice(i, i+block).map((item)=>{return item.slice(j, j+block)}))
				if (coords) {
					return coords.map((item)=>{
						return [item[0]+i, item[1]+j]
					})
				}
			}
		}

		return false
	}




	coords = getCoords(matrix);
	
	if (coords) {
		winner = matrix[coords[0][0]][coords[0][1]];
		return [getCoords(matrix), winner]
	};

	return false
}