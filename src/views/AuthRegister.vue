<template>
  <form class="card auth-card" @submit.prevent="onRegister">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ 'invalid': ($v.email.$dirty && !$v.email.required)
              || ($v.email.$dirty && !$v.email.email) }">
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid">
          Обязательное для заполнения поле
        </small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid">
          Введите корректный email
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model="password"
          :class="{ 'invalid': ($v.password.$dirty && !$v.password.required)
            || ($v.password.$dirty && $v.password.minLength < 6) }">
        <label for="password">Пароль</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid">
          Обязательное для заполнения поле
        </small>
        <small
          v-else-if="$v.password.$dirty && $v.password.minLength < 6"
          class="helper-text invalid">
          Длина пароля не менее {{ $v.password.$params.minLength.min }} символов
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="name"
        >
        <label for="name">Имя</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid">
          Обязательное для заполнения поле
        </small>
      </div>
      <p>
        <label>
          <input
          type="checkbox"
          v-model="agree"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AuthRegister',
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: v => v },
  },
  methods: {
    async onRegister() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }

      try {
        await this.$store.dispatch('register', formData)
        await this.$router.push('/')
      } catch (e) {}
    },
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
  }),
}
</script>
