---
layout: post
title: tips to make c program more effective
category: learning 
description: 让 C 程序更高效的 10 个建议。
---

**本文转自: [oschina](http://www.oschina.net/news/20329/tips-to-make-c-program-effective/)**

**英文原稿：[fortystones](http://www.fortystones.com/tips-to-make-c-program-effective/)**

  代码之美，不仅在于为一个给定问题找到解决方案，而且还在代码的简单性、有效性、紧凑性和效率（内存）。代码设计比实际执行更难 。因此，每一个程序员当用C语言编程时，都应该记着这些东西。本文向你介绍规范你的C代码的10种方法。

## 0. 避免不必要的函数调用

考虑下面的2个函数：

```
void str_print( char *str )
 
{
 
    int i;
 
    for ( i = 0; i < strlen ( str ); i++ ) {
 
        printf("%c",str[ i ] );
 
    }
 
}
void str_print1 ( char *str )
 
{
 
    int len;
 
    len = strlen ( str );
 
    for ( i = 0; i < len; i++ ) {
 
        printf("%c",str[ i ] );
 
    }
 
}

```
请注意 这两个函数的功能相似。然而，第一个函数调用strlen（）函数多次，而第二个函数只调用函数strlen（）一次。因此第一个函数性能明显比第二个好。（更新：原作者应该是笔误，把第一个函数写成优于第二个，否则自相矛盾。）


## 1、避免不必要的内存引用

这次我们再用2个例子来对比解释：

```
int multiply ( int *num1 , int *num2 )
 
{
 
    *num1 = *num2;
 
    *num1 += *num2;
 
    return *num1;
 
}
int multiply1 ( int *num1 , int *num2 )
 
{
 
    *num1 = 2 * *num2;
 
    return *num1;
 
}

```
同样，这两个函数具有类似的功能。所不同的是在第一个函数（ 1 for reading *num1 , 2 for reading *num2 and 2 for writing to *num1）有5个内存的引用，而在第二个函数是只有2个内存引用（one for reading *num2 and one for writing to *num1）。现在你认为哪一个好些？


## 2、节约内存（内存对齐和填充的概念）

```
　　struct {
 
    char c;
 
    int i;
 
    short s;
 
}str_1;
struct {
 
    char c;
 
    short s;
 
    int i;
 
}str_2;

```
假设一个字符需要1个字节，short占用2个字节和int需要4字节的内存。起初，我们会认为上面定义的结构是相同的，因此占据相同数量的内存。然而，而str_1占用12个字节，第二个结构只需要8个字节？这怎么可能呢？

请注意，在第一个结构，3个不同的4个字节被分配到三种数据类型，而在第二个结构的前4个自己char和short可以被采用，int可以采纳在第二个的4个字节边界（一共8个字节）。


## 3、如果你知道要处理的值是非负数的，使用无符号整数，而不是整数的。

有些处理器可以处理无符号的整数比有符号整数的运算速度要快。（这也是很好的实践，帮助self-documenting代码）。


## 4、在一个逻辑条件语句中常数项永远在左侧。

```
int x = 4;
 
if ( x = 1 ) {
 
    x = x + 2;
 
    printf("%d",x);          // Output is 3
 
}
int x = 4;
 
if ( 1 = x ) {
 
    x = x + 2;
 
    printf("%d",x);   // Compilation error
 
}

```
使用“=”赋值运算符，替代“==”相等运算符，这是个常见的输入错误。 常数项放在左侧，将产生一个编译时错误，让你轻松捕获你的错误。注：“=”是赋值运算符。 b = 1会设置变量b等于值1。 “==”相等运算符。如果左侧等于右侧，返回true，否则返回false。


## 5、在可能的情况下使用typedef替代macro。

当然有时候你无法避免macro，但是typedef更好。

```
typedef int* INT_PTR;
 
INT_PTR a , b;
 
# define INT_PTR int*;
 
INT_PTR a , b;

```
在这个宏定义中，a是一个指向整数的指针，而b是只有一个整数声明。使用typedef a和b都是 整数的指针。


## 6、确保声明和定义是静态的，除非您希望从不同的文件中调用该函数。

在同一文件函数对其他函数可见，才称之为静态函数。它限制其他访问内部函数，如果我们希望从外界隐藏该函数。现在我们并不需要为内部函数创建头文件，其他看不到该函数。

静态声明一个函数的优点包括：

+ A）两个或两个以上具有相同名称的静态函数，可用于在不同的文件。
+ B）编译消耗减少，因为没有外部符号处理。

让我们做更好的理解，下面的例子：

```
/*first_file.c*/
 
static int foo ( int a )
 
{
 
/*Whatever you want to in the function*/
 
}
 
/*second_file.c*/
 
int foo ( int )
 
int main()
 
{
 
    foo();      // This is not a valid function call as the function foo can only be called by any other function within first_file.c where it is defined.
 
    return 0;
 
}

```

## 7、使用Memoization，以避免递归重复计算

考虑Fibonacci（斐波那契）问题;

Fibonacci问题是可以通过简单的递归方法来解决：

```
int fib ( n )
 
{
 
    if ( n == 0 || n == 1 ) {
 
        return 1;
 
    }
 
    else {
 
        return fib( n - 2 ) + fib ( n - 1 );
 
    }
 
}

```
注：在这里，我们考虑Fibonacci 系列从1开始，因此，该系列看起来：1，1，2，3，5，8，…

![tips](/images/blog/tips/Fibonacci-recursion.jpg)

注意：从递归树，我们计算fib（3）函数2次，fib（2）函数3次。这是相同函数的重复计算。如果n非常大，`fib<n（i）`函数增长`i<n`。解决这一问题的快速方法将是计算函数值1次，存储在一些地方，需要时计算，而非一直重复计算。

这个简单的技术叫做Memoization，可以被用在递归，加强计算速度。

fibonacci 函数Memoization的代码，应该是下面的这个样子：

```
int calc_fib ( int n )
{
    int val[ n ] , i;
    for ( i = 0; i <=n; i++ ) {
        val[ i ] = -1;         // Value of the first n + 1 terms of the fibonacci terms set to -1
    }
    val[ 0 ] = 1;                 // Value of fib ( 0 ) is set to 1
    val[ 1 ] = 1;            // Value of fib ( 1 ) is set to 1
    return fib( n , val );
}
int fib( int n , int* value )
{
    if ( value[ n ] != -1 ) {
        return value[ n ];              // Using memoization
    }
    else {
        value[ n ] = fib( n - 2 , value ) + fib ( n - 1 , value );          // Computing the fibonacci term
    }
    return value[ n ];                // Returning the value
}

```
这里calc_fib( n )函数被main()调用。
　

## 8、避免悬空指针和野指针

一个指针的指向对象已被删除，那么就成了悬空指针。野指针是那些未初始化的指针，需要注意的是野指针不指向任何特定的内存位置。

```
void dangling_example()
 
{
 
    int *dp = malloc ( sizeof ( int ));
 
    /*........*/
 
    free( dp );             // dp is now a dangling pointer
 
    dp = NULL;      // dp is no longer a dangling pointer
 
}
 
void wild_example()
 
{
 
    int *ptr;       // Uninitialized pointer
 
    printf("%u"\n",ptr );
 
    printf("%d",*ptr );
 
}

```
当遭遇这些指针，程序通常是”怪异“的表现。


## 9、 永远记住释放你分配给程序的任何内存。
上面的例子就是如果释放dp指针（我们使用malloc()函数调用）。



编辑：smm