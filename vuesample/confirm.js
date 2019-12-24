const template = `
    <div>
        <transition>
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <h3 slot="header">{{title}}</h3>
                        </div>
                        <div class="modal-body">
                            <slot name="body">
                                {{ msg }}
                            </slot>
                        </div>
                        <div class="modal-footer">
                            <slot name="footer">
                                <button class="modal-default-button" @click="sendResult(false)">
                                    {{ negative }}
                                </button>
                                <button class="modal-default-button" @click="sendResult(true)">
                                    {{ positive }}
                                </button>
                            <!--
                                <a href="#" class="btn-flat-bottom-border" @click="sendResult(false)">
                                    <span>{{ negative }}</span>
                                </a>
                                <a href="#" class="btn-flat-bottom-border" @click="sendResult(true)">
                                    <span>{{ positive }}</span>
                                </a>
                            -->
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
`;

export default {
    template,
    props: {
        title: String,
        msg: String,
        positive: String,
        negative: String,
    },
    methods: {
        sendResult(flg) {
            this.$emit("dialogResult", flg);
        },
    },
};
