---
date: '2023-08-16'
title: Fundamentals of Data Engineering
draft: true
---
해당 내용을 공부하며 작성한 내용입니다.

## Table of Contents

1. 데이터 엔지니어링의 설명
2. 데이터 엔지니어링의 라이프사이클
3. 좋은 데이터 아키텍처의 디자인
4. 데이터 엔지니어링 라이프사이클 전반에 걸친 기술 선택
5. 소스 시스템에서의 데이터 세대
6. 저장공간
7. Ingestion(섭취)
8. 쿼리, 모델링, 그리고 변환
9. 분석, 머신러닝, 그리고 리버스 ETL을 위한 데이터 제공
10. 보안과 프라이버시
11. 데이터 인지니어링의 미래

## Preface

이 책은 특별한 틀, 기술, 또는 플랫폼이 아니라 데이터 엔지니어링 라이프사이클에 대한 전반적인 내용을 다루고 있다.

## 데이터 엔지니어링의 정의

분석과 머신 러닝같은 최종 사용 방식을 도와주는 Raw data와 일관된 정보를 발전, 실행, 유지하는 시스템과 프로세스를 말한다. 데이터 엔지니어링은 보안, 데이터 매니지먼트, DataOps, data architecture, Orchestration, 소프트 엔지니어링과 교차점이 있다.

## 데이터 엔지니어링 Lifecycle

데이터 엔지니어링 Lifecycle은 기술에서 나와 데이터 그 자체와 최종 목적을 향해 제공해야 하는 것으로 바꾸는 것을 대화해야 한다.

## Reference

 Joe Reis & Matt housley - Fundamentals of Data Engineering(OREILLY)

<!-- Reference

## HTML Elements

Below is just about everything you'll need to style in the theme. Check the source code to see the many embedded elements within paragraphs.

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

### Body text

Lorem ipsum dolor sit amet, test link adipiscing elit. **This is strong**. Nullam dignissim convallis est. Quisque aliquam.

![Smithsonian Image](https://mmistakes.github.io/minimal-mistakes/images/3953273590_704e3899d5_m.jpg)
{: .image-right}

*This is emphasized*. Donec faucibus. Nunc iaculis suscipit dui. 53 = 125. Water is H2O. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. The New York Times (That’s a citation). Underline.Maecenas ornare tortor. Donec sed tellus eget sapien fringilla nonummy. Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus.

HTML and CSS are our tools. Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus.

### Blockquotes

> Lorem ipsum dolor sit amet, test link adipiscing elit. Nullam dignissim convallis est. Quisque aliquam.

## List Types

### Ordered Lists

1. Item one
   1. sub item one
   2. sub item two
   3. sub item three
2. Item two

### Unordered Lists

* Item one
* Item two
* Item three

## Tables

| Header1 | Header2 | Header3 |
|:--------|:-------:|--------:|
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|----
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|=====
| Foot1   | Foot2   | Foot3
{: rules="groups"}

## Code Snippets

{% highlight css %}
#container {
  float: left;
  margin: 0 -240px 0 0;
  width: 100%;
}
{% endhighlight %}

## Buttons

Make any link standout more when applying the `.btn` class.

{% highlight html %}
<a href="#" class="btn btn-success">Success Button</a>
{% endhighlight %}

<div markdown="0"><a href="#" class="btn">Primary Button</a></div>
<div markdown="0"><a href="#" class="btn btn-success">Success Button</a></div>
<div markdown="0"><a href="#" class="btn btn-warning">Warning Button</a></div>
<div markdown="0"><a href="#" class="btn btn-danger">Danger Button</a></div>
<div markdown="0"><a href="#" class="btn btn-info">Info Button</a></div>

## KBD

You can also use `<kbd>` tag for keyboard buttons.

{% highlight html %}
<kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>
{% endhighlight %}

Press <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> to move your car. **Midtown Maddness!!**

## Notices

**Watch out!** You can also add notices by appending `{: .notice}` to a paragraph.
{: .notice} -->
