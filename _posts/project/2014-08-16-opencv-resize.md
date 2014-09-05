---
layout: post
title: opencv基本操作之图像缩放
category: project
description: 本篇文章学习opencv中对图像的基本操作
---
###
###opencv基本操作之图像缩放
函数原型：

    void resize(InputArray src, OutputArray dst, Size dsize, double fx=0, double fy=0, int interpolation=INTER_LINEAR ); 

函数参数说明：

* src:输入图像
* dst:表示输出图像
* dsize:输出图像的大小。如果为零，输出图像的大小有fx 和 fy来计算计算方式为：dsize = Size(round(fx*src.cols), round(fy*src.rows))
* fx：水平比例因子
* fy: 垂直比例因子
* interpolation：插值方法（默认是双线性插值）

示例代码：
```
    int main()
    {
    Mat image = imread("../大话西游.jpg", CV_LOAD_IMAGE_GRAYSCALE);
	//缩放因子
	double fScale = 0.5;
	int row = int(image.rows*fScale);
	int col = int(image.cols*fScale);
	//创建图片
	Mat newImage(row, col, image.type());
	//缩放
	resize(image, newImage, Size(col, row));
	//显示图片
	imshow("原始图片", image);
	imshow("缩放后的图片", newImage);
	waitKey(0);
	return 0;
	}
```
运行结果：
![imag1](/images/project/opencv/resize.jpg)
