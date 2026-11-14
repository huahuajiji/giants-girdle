<template>
  <div id="main" class="alt">
    <section id="one">
      <div class="inner">
        <header class="major">
          <h1>联系方式</h1>
        </header>
      </div>
    </section>
  </div>

  <section id="contact">
    <div class="inner">
      <section>
        <form method="post" action="">
          <div class="fields">
            <div class="field half">
              <label for="name">姓名</label>
              <input type="text" name="name" id="name" />
            </div>
            <div class="field half">
              <label for="email">邮箱</label>
              <input type="email" name="email" id="email" />
            </div>
            <div class="field">
              <label for="subject">主题</label>
              <input type="text" name="subject" id="subject" />
            </div>
            <div class="field">
              <label for="message">留言</label>
              <textarea name="message" id="message" rows="6"></textarea>
            </div>
          </div>
          <ul class="actions">
            <li><input type="submit" value="发送" class="primary" /></li>
            <li><input type="reset" value="清空" /></li>
          </ul>
        </form>
      </section>
      <section class="split">
        <section>
          <div class="contact-method">
            <span class="icon solid alt fa-envelope"></span>
            <h3>邮箱</h3>
            <a href="#">待填写</a>
          </div>
        </section>
        <section>
          <div class="contact-method">
            <span class="icon solid alt fa-phone"></span>
            <h3>电话</h3>
            <span>待填写</span>
          </div>
        </section>
        <section>
          <div class="contact-method">
            <span class="icon solid alt fa-home"></span>
            <h3>所在城市</h3>
            <span>待填写</span>
          </div>
        </section>
      </section>
    </div>
  </section>
</template>
