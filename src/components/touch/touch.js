import util from '../../utils/util.js';

const app = getApp();
Component({
	options: {
		multipleSlots: true,
	},
	properties: {
		stylestr: {
			type: String,
			value: 0,
		},
	},
	data: {
		startX: 0, // 触摸点起始位置
		startOffset: 0, // 起始的偏移距离
		offset: 0, // 偏移列表
		maxOffset: 30, // 最大偏移距离,rpx
		pointBefore: {}, // 前一个滑动的点
	},
	methods: {
		touchStart(e) {
			if (e.touches.length == 1) {
				let offsetBefore = this.data.offset;
				this.setData({
					// 设置触摸起始点水平方向位置
					startX: e.touches[0].clientX,
					startOffset: offsetBefore,
					pointBefore: e.touches[0],
				});
			}
		},
		touchMove(e) {
			if (e.touches.length == 1) {
				let pointBefore = this.data.pointBefore;
				let thisPoint = e.touches[0];
				let slope =
					Math.abs(pointBefore.clientY - thisPoint.clientY) /
					Math.abs(pointBefore.clientX - thisPoint.clientX);
				// console.log(slope)
				if (slope > 0.57) {
					return;
				}
				let index = e.currentTarget.dataset.index;
				let offsetResult = 0;
				// 手指移动时水平方向位置
				let moveX = e.touches[0].clientX;
				// 手指起始点位置与移动期间的差值
				let disX = this.data.startX - moveX;
				let resultX = this.data.startOffset + disX;
				if (resultX <= 0) {
					// 如果移动距离小于等于0，说明向右滑动，文本层位置不变
					offsetResult = resultX;
				}
				else if (resultX >= this.data.maxOffset) {
					// 控制手指移动距离最大值为删除按钮的宽度
					offsetResult = this.data.maxOffset;
				}
				else if (resultX > 0) {
					// 移动距离大于0，文本层left值等于手指移动距离
					offsetResult = resultX;
				}
				this.setData({
					offset: offsetResult,
				});
			}
		},
		touchEnd: function (e) {
			if (e.changedTouches.length == 1) {
				let pointBefore = this.data.pointBefore;
				let thisPoint = e.changedTouches[0];
				let slope =
					Math.abs(pointBefore.clientY - thisPoint.clientY) /
					Math.abs(pointBefore.clientX - thisPoint.clientX);
				// console.log(slope)
				if (slope > 0.57) {
					return;
				}
				// 手指移动结束后水平位置
				let endX = e.changedTouches[0].clientX;
				// 触摸开始与结束，手指移动的距离
				let disX = this.data.startX - endX;
				// 如果距离小于删除按钮的1/2，不显示删除按钮
				let offset = 0;
				// console.log("end;" + disX)
				if (disX >= 0 && disX > 30) {
					offset =
						disX > this.data.maxOffset / 2 ?
							this.data.maxOffset :
							this.data.startOffset; // 左滑
					this.triggerEvent('moveToLeft');
				}
				else if (disX < 0 && disX < -30) {
					offset =
						Math.abs(disX) > this.data.maxOffset / 2 ? 0 : this.data.maxOffset; // 右滑
					this.triggerEvent('moveToRight');
				}
				// 更新列表的状态
			}
		},
	},
	ready: function () {},
});
