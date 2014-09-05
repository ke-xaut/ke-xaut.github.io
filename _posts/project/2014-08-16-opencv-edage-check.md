---
layout: post
title: opencv图像处理之边缘检测
category: project
description: 本篇文章学习opencv中边缘检测的各种算子和滤波器
---


## 一.边缘检测
先谈边缘检测的基本步骤

1. 滤波：边缘检测的算法主要是基于一阶导数或二阶导数的，但是导数对噪声很敏感，因此必须采用滤波器来改善与噪声有关的边缘检测器的性能。常见的滤波方法主要有高斯滤波，即采用离散化的高斯函数产生一组归一化的高斯核，然后基于高斯核函数对图像灰度矩阵的每一点进行加权求和。

2. 增强：增强边缘的基础是确定图像各点邻域强度的变化值。增强算法可以将图像灰度点邻域强度值有显著变化的点凸显出来。在具体编程实现时，可通过计算梯度幅值来确定。

3. 检测：经过增强的图像，往往邻域中有很多点的梯度值比较大，而在特定的应用中，这些点并不是我们要找的边缘点，所以应该采用某种方法来对这些点进行取舍。实际工程中，常用的方法是通过阈值化方法来检测。

## 二.canny算子篇
### canny算子简介
Canny边缘检测算子是John F.Canny于 1986 年开发出来的一个多级边缘检测算法。更为重要的是 Canny 创立了边缘检测计算理论（Computational theory ofedge detection），解释了这项技术是如何工作的。Canny边缘检测算法以Canny的名字命名，被很多人推崇为当今最优的边缘检测的算法。
其中，Canny 的目标是找到一个最优的边缘检测算法，让我们看一下最优边缘检测的三个主要评价标准:

1. **低错误率**: 标识出尽可能多的实际边缘，同时尽可能的减少噪声产生的误报。

2. **高定位性**: 标识出的边缘要与图像中的实际边缘尽可能接近。

3. **最小响应**: 图像中的边缘只能标识一次，并且可能存在的图像噪声不应标识为边缘。

### Canny边缘检测的步骤

1. 消除噪声 ：一般使用高斯平滑滤波器

2. 计算梯度幅值和方向

3. 非极大值抑制（排除非边缘像素）

4. 滞后阈值。最后一步，Canny 使用了滞后阈值，滞后阈值需要两个阈值(高阈值和低阈值):

    1. 如果某一像素位置的幅值超过 高 阈值, 该像素被保留为边缘像素。

	2. 如果某一像素位置的幅值小于 低 阈值, 该像素被排除。
	
	3. 如果某一像素位置的幅值在两个阈值之间,该像素仅仅在连接到一个高于高阈值的像素时被保留。

对于Canny函数的使用，推荐的高低阈值比在2:1到3:1之间。
更多的细节，可以参考canny算子的[wikipedia](http://en.wikipedia.org/wiki/Canny_edge_detector)

函数原型：
C++:
```
	void Canny(InputArray image,OutputArray edges, double threshold1, double threshold2, int apertureSize=3,bool L2gradient=false )
```

+ 第一个参数，InputArray类型的image，输入图像，即源图像，填Mat类的对象即可，且需为单通道8位图像。
+ 第二个参数，OutputArray类型的edges，输出的边缘图，需要和源图片有一样的尺寸和类型。
+ 第三个参数，double类型的threshold1，第一个滞后性阈值。
+ 第四个参数，double类型的threshold2，第二个滞后性阈值。
+ 第五个参数，int类型的apertureSize，表示应用Sobel算子的孔径大小，其有默认值3。
+ 第六个参数，bool类型的L2gradient，一个计算图像梯度幅值的标识，有默认值false。


### 调用Canny函数的实例代码
```
	#include "opencv2\opencv.hpp"
	#include "opencv2\core\core.hpp"
	#include "opencv2\highgui\highgui.hpp"
	using namespace cv;
	int main(){
	//载入原图
	Mat image = imread("../边缘检测2.jpg");
	Mat newImage0 = image.clone();
	Mat newImage1 = image.clone();
	//显示原图
	imshow("原始图片", image);
	
	//Canny 1.最简单用法
	Canny(image, newImage0, 3,9,3);
	imshow("效果图1", newImage0);

	// 2.高阶的canny用法，转成灰度图，降噪，用canny，
	//最后将得到的边缘作为掩码，拷贝原图到效果图上，得到彩色的边缘图 

	Mat dst, edge, gray;
	//创建与原图等大小的矩阵
	dst.create(image.size(), image.type());

	//得到原图的灰度图
	cvtColor(image, gray, CV_BGR2GRAY);

	//先使用3X3的核来降噪
	blur(gray, edge, Size(5, 5));

	//运行Canny算子
	Canny(edge, edge, 15, 45,3);

	//将dst中的所有元素置0
	dst = Scalar::all(0);

	//将边缘图拷贝到dst上
	newImage1.copyTo(dst, edge);

	//显示
	imshow("效果图2", dst);

	waitKey(0);
	return 0;
	}
```

运行结果：
![bianyuan1](/images/project/opencv/bianyuan1.jpg)

<1>创建轨迹条——createTrackbar函数详解

C++: 
```
	int createTrackbar(conststring& trackbarname, conststring& winname,  
 int* value, int count, TrackbarCallback onChange=0,void* userdata=0);  
 ```

+ 第一个参数，const string&类型的trackbarname，表示轨迹条的名字，用来代表我们创建的轨迹条。
+ 第二个参数，const string&类型的winname，填窗口的名字，表示这个轨迹条会依附到哪个窗口上，即对应namedWindow（）创建窗口时填的某一个窗口名。
+ 第三个参数，int*类型的value，一个指向整型的指针，表示滑块的位置。并且在创建时，滑块的初始位置就是该变量当前的值。
+ 第四个参数，int类型的count，表示滑块可以达到的最大位置的值。PS:滑块最小的位置的值始终为0。
+ 第五个参数，TrackbarCallback类型的onChange，首先注意他有默认值0。这是一个指向回调函数的指针，每次滑块位置改变时，这个函数都会进行回调。并且这个函数的原型必须为void XXXX(int,void*);其中第一个参数是轨迹条的位置，第二个参数是用户数据（看下面的第六个参数）。如果回调是NULL指针，表示没有回调函数的调用，仅第三个参数value有变化。
+ 第六个参数，void*类型的userdata，他也有默认值0。这个参数是用户传给回调函数的数据，用来处理轨迹条事件。如果使用的第三个参数value实参是全局变量的话，完全可以不去管这个userdata参数。

源代码
	
```
	#include "opencv2\opencv.hpp"
	#include "opencv2\core\core.hpp"
	#include "opencv2\highgui\highgui.hpp"
	using namespace cv;
	Mat srcImage, cannyImage;
	string cannyTitle = "边缘检测图（www.nameiswangyu.com）";

	//回调函数
	void on_trackbar(int threShold,void *){
	Canny(srcImage, cannyImage, threShold, threShold * 3, 3);
	imshow(cannyTitle, cannyImage);
	}

	int main(){
	//载入原图
	srcImage = imread("../Lena.jpg",CV_LOAD_IMAGE_GRAYSCALE);
	//创建一个图片
	cannyImage.create(srcImage.size(), srcImage.type());
	//创建一个窗口
	namedWindow(cannyTitle, CV_WINDOW_AUTOSIZE);
	//这个值决定滑块的起始位置
	int nThresholdEdge = 10;

	//在一个窗口里面创建一个滚动条
	createTrackbar("阀值", cannyTitle, &nThresholdEdge, 100, on_trackbar);
	//先调用一次回调函数，这样初始画面图片显示
	on_trackbar(1,nullptr);
	
	waitKey(0);
	return 0;

	}
```

运行结果：
![lena_trackbar1](/images/project/opencv/lena_track1.jpg)
![lena_trackbar2](/images/project/opencv/lena_track2.jpg)





	
