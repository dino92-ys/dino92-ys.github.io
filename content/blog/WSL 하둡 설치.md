---
date: '2023-07-17'
title: WSL 하둡 설치
draft: true
---
## 윈도우에 Ubuntu 설치

1. Linux용 Windows 하위 시스템
  - 제어판 > 프로그램 및 기능 > Windows 기능 켜기/끄기 > Linux용 Windows 하위 시스템 선택 > 확인
2. 개발자 모드 설정
  - 설정 > 업데이트 및 보안 > 개발자용 > 개발자 모드 켬 > 컴퓨터 재부팅
3. Windows Update
4. powershell 관리자 권한 실행
  - WSL 시스템 활성화
  {% highlight html %}
    dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
  {% endhighlight %}
  - Vitual Machine 기능 활성화
  {% highlight html %}
    dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
  {% endhighlight %}
5. Linux 커널 업데이트 패키지 다운로드
  {% highlight html %}
   https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi
   {% endhighlight %}
7. WSL 2 기본 버전 세팅 - powershell에서 진행
   {% highlight html %}
   wsl --set-default-version 2
   {% endhighlight %}
  이 코드는 WSL 2를 기본 버전으로 세팅하는 단계이다.
  이 때, "가상 머신 플랫폼 Windows 기능을 사용하도록 설정하고 BIOS에서 가상화를 사용하도록 설정되어 있는지 확인하세요." 라고 에러가 나오는 경우
   {% highlight html %} 
   bcdedit /set hypervisorlaunchtype auto
  {% endhighlight %}
  를 치고 재부팅하고 난뒤, 다시 입력하면, 작업 완료했다고 나온다. 
8. Ubuntu 설치
   - Microsoft Store에서 Ubuntu 검색해서 다운.
   - 계정이름은 소문자로 한다.

<!--
{% highlight html %} 
   
  {% endhighlight %}
-->
## 우분투 하둡 설치 전 환경설정

{% highlight html %} 
1. 우분투 접속 후, ROOT 계정 비밀번호 설정
  $ sudo passwd root
2. 우분투에 openjdk 설치 - version 8
  $ sudo apt install openjdk-8-jdk
3. 이동 후(cd), 리스트 확인(ls)하여 java-8-openjdk 설치 확인
  $ cd /usr/lib/jvm -> $ ls
4. JAVA_HOME 환경변수를 설정
  $ sudo vi ~/.bashrc
  vi 편집기로 .bashrc 파일을 열어 JAVA_HOME 환경변수 내용을 추가 (i=Insert)
  export JAVA_HOME=/usr/lib/jvm/java-8-oppenjdk-amd64/
5. 하둡만 다룰 계정 생성
  - 클러스터를 효과적으로 관리, 보안에도 좋기 때문
  $ sudo appt install openssh-server openssh-client -y
  (localhost와 ssh통신을 위한 openssh-server openssh-client 설치)
  $ sudo adduser USER
  예시) $ sudo adduser hdoop
  $ su - hdoop
  hdoop 계정으로 접속
6. 하둡 유저를 위해 비밀번호 필요없는 ssh통신 연결
   $ ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
   cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
   chmod 0600 ~/.ssh/authorized_keys
   ssh localhost
  {% endhighlight %}

## 하둡 설치

{% highlight html %}
  1. root 디렉토리로 이동하고 하둡 다운로드 (현재 등록된 버전 확인 후 다운)
    $ wget https://downloads.apache.org/hadoop/common/hadoop-3.3.6/haddop-3.3.6.tar.gz
  2. 하둡 설치파일 압축 해제
    $ tar xzf hadoop-3.3.6.tar.gz
    하둡을 single node로 설치하는 pseudo-distributed mode로 설치
    (각 하둡 데몬이 단일 자바 프로세스로 운영될 수 있도록 해줍니다.)
    configuration files to set up(설정값 파일 목록)
    - bashrc
    - hadoop-env.sh
    - core-site.xml
    - hdfs-site.xml
    - mapred-site-xml
    - yarn-site.xml
  3. 하둡 환경변수 설정 (.bashrc 파일 설정)
    $ nano .bashrc
    (nano는 vi와 다른 ubuntu 기본 제공 편집기)
    nano .bashrc 했을 때 ↓키로 맨 마지막으로 내려가서 아래의 텍스트(하둡환경변수를 추가합니다.)
    #Hadoop Related Options
    export HADOOP_HOME=/home/hdoop/hadoop-3.3.6
    export HADOOP_INSTALL=$HADOOP_HOME export HADOOP_MAPRED_HOME=$HADOOP_HOME
    export HADOOP_COMMON_HOME=$HADOOP_HOME
    export HADOOP_HDFS_HOME=$HADOOP_HOME
    export YARN_HOME=$HADOOP_HOME
    export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native export    PATH=$PATH:$HADOOP_HOME/sbin:$HADOOP_HOME/bin
    export HADOOP_OPTS="-Djava.library.path=$HADOOP_HOME/lib/native"
    (nano .bashrc 했을 때 ↓키로 맨 마지막으로 내려가서 아래의 텍스트(하둡환경변수를 추가) ctrl+x > y > enter로 저장 후 nano 빠져나오기)
  4. 하둡환경변수 설정 적용
    $ sourc ~/.bashrc
  5. hadoop-env.sh 파일 편집
    $ nano $HADOOP_HOME/etc/hadoop/hadoop-env.sh
    (-yarn, HDFS, MapReduce 하둡관련된 프로젝트 셋팅에 관한 파일)
    JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
    (#export JAVA_HOME=  부분의 #을 제거하고(주석제거) ctrl+x > y > enter로 저장 후 nano 빠져나오기)
    $ which javac (결과: /usr/bin/javac)
    $ readlink -f /usr/bin/javac (결과: /usr/lib/jvm/java-8-openjdk-amd64/bin/javac)
    (java path 체크)
  6. core-site.xml 편집 (core-site.xml 은 HDFS와 Hadoop 핵심 property들을 정의하는 파일)
    $ nano $HADOOP_HOME/etc/hadoop/core-site.xml
    (core-site.xml 파일에 아래의 텍스트를 붙여넣고 저장)
    <configuration>
      <property>
        <name>hadoop.tmp.dir</name>
        <value>/home/hdoop/tmpdata</value>
      </property>
      <property>
        <name>fs.default.name</name>
        <value>hdfs://127.0.0.1:9000</value>
      </property>
    </configuration>
    (빠져나온 이후에 tmpdata 디렉토리를 만들어 준다.)
    $ mkdir tmpdata
  7. hdfs-site.xml 파일 편집 (데이터 노드와 네임노드의 저장소 디렉토리를 설정하는 파일)
    $ nano $HADOOP_HOME/etc/hadoop/hdfs-site.xml
    (hdfs-site.xml 파일에 아래의 텍스트를 붙여놓고 저장)
    <configuration>
      <property>
        <name>dfs.data.dir</name>
        <value>/home/hdoop/dfsdata/namenode</value>
      </property>
      <property>
        <name>dfs.data.dir</name>
        <value>/home/hdoop/dfsdata/datanode</value>
      </property>
      <property>
        <name>dfs.replication</name>
        <value>1</value>
      </property>
    </configuration>
  8. mapred-site.xml 파일 편집 (mapreduce 파일의 값을 정의하기 위한 파일)
    $ nano $HADOOP_HOME/etc/hadoop/mapred-site.xml
    (mapred-site.xml 파일에 아래의 텍스트를 붙여놓고 저장)
    <configuration>
      <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
      </property>
    </configuration>
  9. yarn-site.xml 파일 편집 (yarn-site.xml은 YARN에 관련된 세팅들을 정의하는 파일이며 node manager, Resource manager, containers, application master 설정을 포함)
    $ nano $HADOOP_HOME/etc/hadoop/yarn-site.xml
    (yarn-site.xml 파일에 아래의 텍스트를 붙여놓고 저장)
    <configuration>
      <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
      </property>
      <property>
        <name>yarn.nodemanager.aux-services.mapreduce.shuffle.class</name>
        <value>org.apache.hadoop.mapred.ShuffleHandler</value>
      </property>
      <property>
        <name>yarn.resourcemanager.hostname</name>
        <value>0.0.0.0</value>
      </property>
      <property>
        <name>yarn.resourcemanager.address</name>
        <value>0.0.0.0:8032</value>
      </property>
      <property>
        <name>yarn.web-proxy.address</name>
        <value>0.0.0.0:8089</value>
      </property>
      <property>
        <name>yarn.acl.enable</name>
        <value>0</value>
      </property>
      <property>
        <name>yarn.nodemanager.env-whitelist</name>
        <value>JAVA_HOME,HADOOP_COMMON_HOME,HADOOP_HDFS_HOME,HADOOP_CONF_DIR,CLASSPATH_PERPEND_DISTCACHE,HADOOP_YARN_HOME,HADOOP_MAPRED_HOME</value>
      </property>
    </configuration>
  10. 소스 적용
    $ (root에서) source ~/.bashrc
  11. Format HDFS Namenode (Hadoop 서비스를 처음 시작하기전에 namenode를 format(네임노드 초기화)하는 것은 중요)
    (cd hadoop-3.3.6/bin 위치)
    $ ./hdfs namenode -format
  12. 하둡클러스터 시작
    - NameNode 및 DataNode를 시작
    $ ./start-dfs.sh
    (위치: /hadoopp-3.3.6/sbin)
    starting namenodes on [localhost]
    starting datanodes
    starting secondary namenodes [pnap-VirtualBox]
    - YARN 리소스 및 노드 관리자를 시작
    $ ./start-yarn.sh
    (위치: /hadoopp-3.3.6/sbin)
    starting resourcemanager
    starting nodemanagers
    - 모든 데몬이 활성 상태이고 Java 프로세스로 실행 중인지 확인
    $ jps
    469 DataNode
    742 SecondaryNameNode
    32759 NameNode
    31180 NodeManager
    31020 ResourceManager
    988 Jps
  13. Hadoop NameNode: http://localhost:9870
  14. Hadoop DataNode: http://localhost:9864
  15. Hadoop YARN 리소스 관리자: http://localhost:8088
{% endhighlight %}

### Reference

1. 우분투 설치 - [https://ingu627.github.io/tips/install_ubuntu/]
2. 우분투에 하둡설치 - [https://spidyweb.tistory.com/214#recentComments]
   - 위 원본 - [https://phoenixnap.com/kb/install-hadoop-ubuntu]
3. trubbleshooting - [https://kontext.tech/article/978/install-hadoop-332-in-wsl-on-windows]

<!-- 

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
