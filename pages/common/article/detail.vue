<template>
    <view>
        <wsf-article :title="title" :content="content" :type="type" :error="error"></wsf-article>
        <view class="tui-btn-back" @tap="back">返回</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                error: '',
                content: '',
                type: 1
            }
        },
        created() {

        },
        onLoad(option) {
            // 文章id
            if (option.id) {
                this.getArticleDetail(option.id)
            } else {
                plus.nativeUI.toast('参数出错')
                setTimeout(() => {
                    uni.navigateBack()
                }, 500)
            }

        },
        methods: {
            back() {
                uni.navigateBack({
                    delta: 1
                })
            },
            getArticleDetail(id) {
                let _this = this;
                this.$api.article.detail(id).then(res => {
                    if (!_this.helper.isEmpty(res.data) && !_this.helper.isEmpty(res.data.id)) {
                        _this.title = res.data.title
                        _this.type = res.data.type
                        _this.content = res.data.content
                    } else {
                        _this.error = res.data.message || '文章内容获取失败!'
                    }
                    // 设置标题
                    uni.setNavigationBarTitle({
                        title: _this.title
                    });
                }).catch(_ => {
                    _this.error = '文章内容获取失败!'
                });
            }
        }
    }
</script>

<style>
    .tui-btn-back {
        width: 88rpx;
        height: 88rpx;
        font-size: 26rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        position: fixed;
        bottom: 60rpx;
        right: 30rpx;
        z-index: 9999;
    }
</style>
