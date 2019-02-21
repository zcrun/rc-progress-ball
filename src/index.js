import React from "react";
import PropTypes from "prop-types";

export default class ProgressBall extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.number,
        size: PropTypes.number,
        color: PropTypes.string,
        textColor: PropTypes.string,
        waveWidth: PropTypes.number,
        waveHeight: PropTypes.number,
        speed: PropTypes.number,
        xOffset: PropTypes.number
    };

    static defaultProps = {
        id: "progressBall", // canvas的id
        value: 50, // 进度值
        size: 140, // 大小
        color: "#20b3ff", //背景颜色
        textColor: "#000", //文字颜色
        waveWidth: 0.045, //波浪宽度,数越小越宽
        waveHeight: 16, //波浪高度,数越大越高
        speed: 0.04, //波浪速度，数越大速度越快
        xOffset: 0 //波浪x偏移量
    };

	timer;
	
    componentDidMount() {
        this.redrawCircle();
	}
	componentDidUpdate(){
		this.redrawCircle();
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

    redrawCircle = () => {
        let { id, value, size, color, textColor, waveWidth, waveHeight, speed, xOffset } = this.props;
        var canvas = document.getElementById(id);
        var ctx = canvas.getContext("2d");

        //range控件信息
        var rangeValue = value;
        var nowRange = 0; //用于做一个临时的range

        //画布属性
        var mW = (canvas.width = size);
        var mH = (canvas.height = size);
        var lineWidth = 2;

        //圆属性
        var r = mH / 2; //圆心
        var cR = r - 4 * lineWidth; //圆半径

        //Sin 曲线属性
        var sX = 0;
        var sY = mH / 2;
        var axisLength = mW; //轴长

        ctx.lineWidth = lineWidth;

        //画圈函数
        var IsdrawCircled = false;
        var drawCircle = function() {
            ctx.beginPath();
            //边框颜色
            ctx.strokeStyle = color;
            ctx.arc(r, r, cR + 5, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(r, r, cR, 0, 2 * Math.PI);
            ctx.clip();
        };

        //画sin 曲线函数
        var drawSin = function(xOffset) {
            ctx.save();

            var points = []; //用于存放绘制Sin曲线的点

            ctx.beginPath();
            //在整个轴长上取点
            for (var x = sX; x < sX + axisLength; x += 20 / axisLength) {
                //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
                var y = -Math.sin((sX + x) * waveWidth + xOffset);

                var dY = mH * (1 - nowRange / 100);

                points.push([x, dY + y * waveHeight]);
                ctx.lineTo(x, dY + y * waveHeight);
            }

            //封闭路径
            ctx.lineTo(axisLength, mH);
            ctx.lineTo(sX, mH);
            ctx.lineTo(points[0][0], points[0][1]);
            ctx.fillStyle = color;
            ctx.fill();

            ctx.restore();
        };

        //写百分比文本函数
        var drawText = function() {
            ctx.save();

            var size = 0.4 * cR;
            ctx.font = size + "px Microsoft Yahei";
            ctx.textAlign = "center";
            ctx.fillStyle = textColor;
            ctx.fillText(~~nowRange + "%", r, r + size / 2);

            ctx.restore();
		};
		
        var render = function() {
            ctx.clearRect(0, 0, mW, mH);

            if (IsdrawCircled == false) {
                drawCircle();
            }

            if (nowRange <= rangeValue) {
                var tmp = 1;
                nowRange += tmp;
            }

            if (nowRange > rangeValue) {
                var tmp = 1;
                nowRange -= tmp;
            }

            drawSin(xOffset);
            drawText();

            xOffset += speed;
		};
		
        this.timer = setInterval(render, 20);
    };

    render() {
        const { className, id } = this.props;
        return (
            <div className={className}>
                <canvas id={id} />
            </div>
        );
    }
}
