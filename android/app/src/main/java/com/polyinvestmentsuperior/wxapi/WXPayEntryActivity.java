package com.polyinvestmentsuperior.wxapi;

/**
 * Created by Administrator on 2017/10/30 0030.
 */

        import android.app.Activity;
        import android.os.Bundle;
        import com.theweflex.react.WeChatModule;

public class WXPayEntryActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WeChatModule.handleIntent(getIntent());
        finish();
    }
}


