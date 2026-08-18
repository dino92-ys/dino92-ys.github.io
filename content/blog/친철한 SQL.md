---
date: '2023-05-21'
title: 친절한 SQL
draft: true
---
#### 친절한 SQL 공부 중

SQL: Structured Query Language

SQL 최적화
DBMS 내부에서 프로시저를 작성하고 컴파일해서 실행 가능한 상태로 만드는 전과정

SQL 최적화 과정

1. SQL 파싱
   * 사용자로부터 SQL을 전달 받으면 가장 먼저 SQL 파서(Parser)가 파싱을 진행.

- 파싱트리 생성: SQL문을 이루는 개별 구성요소를 분석해서 파싱 트리 생성
- Syntax 체크: 문법적 오류가 없는지
- Sementic 체크: 의미상 오류가 없는지 확인. 예를 들어, 존재하지 않는 테이블 또는 칼럼을 사용했는지. 사용한 오브젝트에 대한 권한이 있는지 확인.

1. SQL 최적화 - 그 다음 단계가 SQL 최적화이고, 옵티마이저(optimizer)가 그 역할을 맡는다. SQL 옵티마이저는 미리 수집한 시스템 및 오브젝트 통계 정보를 바탕으로 다양한 실행 경로를 생성해서 비교한 후 가장 효율적인 하나를 선택한다. 데이터 베이스 성능을 결정하는 가장 핵심적인 엔진
2. 로우소스 생성 - SQL 옵티마이저가 선택한 실행경로를 실제 가능한 코드 또는 프로시저 형태로 포맷팅하는 단계이다. 로우 소스 생성기(Row Source Genarator)가 그 역할.

SQL 옵티마이저 
사용자가 원하는 작업을 가장 효율적으로 수행할 수 있는 최적의 데이터 액세스 경로를 선택해주는 DBMS의 핵심 엔진이다.

옵티마이저 최적화 단계

1. 사용자로부터 전달 받은 쿼리를 수행하는데 후보군이 될만한 실행계획들을 찾아낸다.
2. 데이터 딕셔너리(Data Dictionary)에 미리 수집해둔 오브젝트 통계 시스템 및 시스템 통계 정보를 이용해 각 실행계획의 예상 비용을 산정.
3. 최저 비용을 나타내는 실행계획을 선택

옵티마이저는 DBWR, LGWR, PMON, SMON과 같은 백그라운드 프로세스가 아닌 서버 프로세스가 가진 기능.

루트 블록의 각 레코드는 하위 노드를 가리키는 블록 주소를 갖는다. 화살표가 그것을 의미한다. 자신이 가리키는 주소(화살표)로 찾아간 블록에는 자신의 키 값보다 크거나 같은 값을 갖는 레코드가 저장되어 있음을 의미한다.

Dynamic SQL
Dynamic SQL에 옵티마이저 힌트를 명시하면 동적으로 구성된 조건절과 서로 상충함으로 인해 오히려 성능 문제를 야기할 수 있다. Dynamic SQL을 이용하더라도 하드파싱에 의한 성능 문제가 발생하지 않도록 바인드 변수를 잘 사용해야 한다. 조건절을 동적으로 구성한다고 해서 입력 값까지 동적으로 변경할 이유는 없다.

인덱스 설계
온라인 트랜잭션을 처리하는 시스템에서 인덱스 설계의 중요성은 아무리 강조해도 지나치지 않다. 인덱스 튜닝, 더 나아가 SQL 튜닝의 하이라이트라고 할 수 있다. 많은 경험과 고도의 기술력이 요구되는 매우 전문적인 설계이기도 하다. 그런 전문성을 갖추기 위해 세밀한 인덱스 원리와 이론을 바탕으로 많은 시행착오를 겪어야 한다.

인덱스 설계의 어려움

1. DML 성능 저하(> TPS 저하)
2. 데이터베이스 사이즈 증가(> 디스크 공간 낭비)
3. 데이터베이스 관리 및 운영 비용 상승


### Reference

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
{: .notice} 
-->
