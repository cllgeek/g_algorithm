/**
	* 创建迷宫 
	* @param {迷宫高度} height  
	* @param {迷宫宽度} width 
	* @param {入口坐标} startPoint  {x:numer,y:numer}
	* @param {出口坐标} endPoint  {x:numer,y:numer}
	* 8 是入口 ，9 是出口,只有唯一一条路线.
	*/
function createMaze(height, width, startPoint, endPoint) {
	class CreateMaze {
		constructor(height, width, startPoint, endPoint) {
			// 验证参数合法
			if (isNaN(height)) throw new Error('heiht 不是数字')
			if (isNaN(width)) throw new Error('width 不是数字')
			if (isNaN(startPoint.x)) throw new Error('startPoint.x 不是数字')
			if (isNaN(startPoint.y)) throw new Error('startPoint.y 不是数字')
			if (isNaN(endPoint.x)) throw new Error('endPoint.x 不是数字')
			if (isNaN(endPoint.y)) throw new Error('endPoint.y 不是数字')
			if (startPoint.x === 0 && startPoint.y === 0) throw new Error('startPoint 不能是顶角')
			if (startPoint.x === 0 && startPoint.y === height - 1) throw new Error('startPoint 不能是顶角')
			if (startPoint.x === width - 1 && startPoint.y === height - 1) throw new Error('startPoint 不能是顶角')
			if (startPoint.x === width - 1 && startPoint.y === 0) throw new Error('startPoint 不能是顶角')
			if (endPoint.x === 0 && endPoint.y === 0) throw new Error('endPoint 不能是顶角')
			if (endPoint.x === 0 && endPoint.y === height - 1) throw new Error('endPoint 不能是顶角')
			if (endPoint.x === width - 1 && endPoint.y === height - 1) throw new Error('endPoint 不能是顶角')
			if (endPoint.x === width - 1 && endPoint.y === 0) throw new Error('endPoint 不能是顶角')
			this.height = height
			this.width = width
			this.startPoint = startPoint
			this.endPoint = endPoint
			this.map = []
			// 走过的点
			this.points = []
			// 走过的点且节点没有路可走的总数
			this.pointCount = -1
			this.init()
		}
		/**
		* 初始化
		*/
		init() {
			this.map = []
			this.points = []
			this.pointCount = -1
			// 地图数组生成
			for (let i = 0; i < this.height; i++) {
				let row = Array(this.width).fill(0)
				this.map.push(row)
			}
			// 设置迷宫开始点
			this.map[this.startPoint.y][this.startPoint.x] = 1
			// 记录走过的点
			this.points.push(Object.assign({}, this.startPoint))

			this.currentPoint = Object.assign({}, this.startPoint)
			// 创建迷宫路线
			this.createMaze(this.currentPoint)
			// 判断结尾没有链接出口，没有则重新生成迷宫
			if (this.endLine()) {
				this.init()
			} else {
				this.map[this.startPoint.y][this.startPoint.x] = 8
				this.map[this.endPoint.y][this.endPoint.x] = 9
				return this.map;
			}
		}
		/**
		* 结束点是否连通迷宫，没有连通重新生成迷宫
		* 返回 false 已经连通
		*/
		endLine() {
			if (this.endPoint.y === 0) {
				// top                    
				if (this.map[this.endPoint.y - 1][this.endPoint.x])
					return false
			} else if (this.endPoint.x === this.width - 1) {
				// right
				if (this.map[this.endPoint.y][this.endPoint.x - 1])
					return false
			} else if (this.endPoint.y === this.height - 1) {
				// bottom
				if (this.map[this.endPoint.y - 1][this.endPoint.x])
					return false
			} else if (this.endPoint.x === 0) {
				// left
				if (this.map[this.endPoint.y][this.endPoint.x + 1])
					return false
			}
			return true
		}
		/**
		* 创建迷宫路线
		*/
		createMaze(point) {
			while (this.pointCount <= this.points.length) {
				let bool = this.goAheadOne(point)
				if (bool) {
					this.pointCount++
					this.createMaze(this.points[this.pointCount])
				} else {
					// 记录当前走过的点
					this.points.push(Object.assign({}, point))
				}
			}
		}
		/**
		* 向前一步，返回 true 当前点没有路可走
		*/
		goAheadOne(point) {
			// 获取当前节点能走的点
			const direction = this.pointWalk(point)
			// 随机选取可走节点
			const n = this.randomDirection(direction)
			// 走
			switch (n) {
				case 0:
					// top
					point.y -= 1
					break;
				case 1:
					//right
					point.x += 1
					break;
				case 2:
					//bottom
					point.y += 1
					break;
				case 3:
					//left
					point.x -= 1
					break;
				default:
					return true
					break;
			}
			this.map[point.y][point.x] = 1
			return false;
		}
		/**
		* 这个点是否能走
		*/
		pointWalk(currentPoint) {
			currentPoint = Object.assign({}, currentPoint)
			let direction = [0, 0, 0, 0]
			// top
			if (currentPoint.y - 1 > 0 &&
				currentPoint.x > 0 &&
				currentPoint.x !== this.width &&
				this.map[currentPoint.y - 1][currentPoint.x] === 0) {
				if (this.currentAround(0, { x: currentPoint.x, y: currentPoint.y - 1 }))
					direction[0] = 1
			}
			// right
			if (currentPoint.x + 2 !== this.width &&
				currentPoint.y > 0 &&
				currentPoint.y !== this.height &&
				this.map[currentPoint.y][currentPoint.x + 1] === 0) {
				if (this.currentAround(1, { x: currentPoint.x + 1, y: currentPoint.y }))
					direction[1] = 1
			}
			// bottom
			if (currentPoint.y + 2 !== this.height &&
				currentPoint.x !== this.width &&
				currentPoint.x > 0 &&
				this.map[currentPoint.y + 1][currentPoint.x] === 0) {
				if (this.currentAround(2, { x: currentPoint.x, y: currentPoint.y + 1 }))
					direction[2] = 1
			}
			// left
			if (currentPoint.x - 1 > 0 &&
				currentPoint.y > 0 &&
				currentPoint.y !== this.height &&
				this.map[currentPoint.y][currentPoint.x - 1] === 0) {
				if (this.currentAround(3, { x: currentPoint.x - 1, y: currentPoint.y }))
					direction[3] = 1
			}
			return direction
		}
		/**
		* 当前点是否能落脚
		*/
		currentAround(n, point) {
			let bool = true
			//top
			if (n !== 2 && point.y !== 0 && this.map[point.y - 1][point.x] === 1) {
				bool = false
			}
			//right
			if (n !== 3 && point.x !== this.width - 1 && this.map[point.y][point.x + 1] === 1) {
				bool = false
			}
			//bottom
			if (n !== 0 && point.y !== this.height - 1 && this.map[point.y + 1][point.x] === 1) {
				bool = false
			}
			//left
			if (n !== 1 && point.x !== 0 && this.map[point.y][point.x - 1] === 1) {
				bool = false
			}
			return bool
		}
		/**
		* 随机获取一个方向
		*/
		randomDirection(direction) {
			let i = 0
			direction.forEach((item) => {
				i += item
			})
			if (i === 0) {
				return -1
			}
			const n = parseInt(Math.random() * 4)
			if (direction[n] === 0) {
				return this.randomDirection(direction)
			}
			return n
		}
	}

	new CreateMaze(height, width, startPoint, endPoint)
}

module.exports = createMaze;
