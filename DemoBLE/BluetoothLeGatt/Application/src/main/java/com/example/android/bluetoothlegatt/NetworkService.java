package com.example.android.bluetoothlegatt;

import android.app.Service;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.IBinder;
import android.util.Log;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class NetworkService extends Service {

    private static String TAG = "NetworkService";

    public NetworkService() {

    }

    class RequestTask extends AsyncTask<String, Void, String> {

        private Exception exception;

        protected String doInBackground(String... urls) {
            try {
                URL url= new URL(urls[0]);
                getRequest(urls[0]);
                return "test";
            } catch (Exception e) {
                this.exception = e;
                Log.e(TAG, e.toString());
                return null;
            }
        }

        protected void onPostExecute(String str) {
            // TODO: check this.exception
            // TODO: do something with the feed
        }
    }

    public void postRequest(String urlString) {
        URL url = null;


    }

    public void getRequest(String urlString){

        URL url = null;
        try {
            url = new URL(urlString);
        } catch (MalformedURLException e) {
            Log.e(TAG, e.toString());
            return;
        }

        try {

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            try {
                InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                readStream(in);
            } catch (Exception e) {
                Log.e(TAG, e.toString());
            }
            finally{
                urlConnection.disconnect();
            }
        } catch (IOException e) {
            Log.e(TAG, e.toString());

        }
    }

    public void readStream(InputStream in) {
        try {
            BufferedReader r = new BufferedReader(new InputStreamReader(in));
            String x = "";
            x = r.readLine();
            String total = "";

            while(x!= null){
                total += x;
                x = r.readLine();
            }
            Log.i(TAG, total);
            Log.i("request", in.toString());
        } catch (Exception e) {

        }

    }



    @Override
    public IBinder onBind(Intent intent) {
        Log.i(TAG, "start");
        // TODO: Return the communication channel to the service.
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "FirstService created");
        String[] t = {"http://www.kartan.no:8099"};
        new RequestTask().execute(t);


        //getRequest("http://www.kartan.no");
    }
    @Override
    public void onDestroy() {
        // TODO Auto-generated method stub
        super.onDestroy();
        Log.d(TAG, "FirstService destroyed");
    }
}
