(function () {
  'use strict';

  // ─── State ──────────────────────────────────────────────────────────
  var files = {};
  var saveTimer = null;
  var openTabs = [];
  var activeTab = '';
  var selectedFile = '';
  var expandedFolders = new Set([]);
  var running = false;
  var editor = null;
  var cursorLine = 1;
  var cursorCol = 1;
  var aiPanelOpen = false;
  var aiPanelWidth = 380;
  var isChatMode = false;
  var musicPanelOpen = false;
  var musicPanelWidth = 360;
  var ctxTargetPath = null;
  // Music state
  var musicResults = [];
  var currentTrackIndex = -1;
  var isPlaying = false;
  // Audio graph
  var audioCtx = null;
  var analyser = null;
  var bassFilter = null;
  var trebleFilter = null;
  var sourceNode = null;
  var surroundEnabled = false;
  var surrDelay = null;
  var surrWetGain = null;
  var vizAnimId = null;
  var bottomVizId = null;
  var eqBassVal = 0;
  var eqTrebleVal = 0;

  // ─── DOM refs ───────────────────────────────────────────────────────
  var fileTreeEl = document.getElementById('fileTree');
  var editorTabsEl = document.getElementById('editorTabs');
  var editorContainer = document.getElementById('editorContainer');
  var emptyState = document.getElementById('emptyState');
  var outputEl = document.getElementById('output');
  var runBtn = document.getElementById('runBtn');
  var stdinInput = document.getElementById('stdinInput');
  var titleFileName = document.getElementById('titleFileName');
  var clearOutputBtn = document.getElementById('clearOutputBtn');
  var newFileBtn = document.getElementById('newFileBtn');
  var collapseBtn = document.getElementById('collapseBtn');
  // AI panel
  var aiPanel = document.getElementById('aiPanel');
  var aiContent = document.getElementById('aiContent');
  var aiStatus = document.getElementById('aiStatus');
  var aiBtn = document.getElementById('aiBtn');
  var aiCloseBtn = document.getElementById('aiCloseBtn');
  var aiCloseFooterBtn = document.getElementById('aiCloseFooterBtn');
  var aiDragHandle = document.getElementById('aiDragHandle');
  // AI chat
  var aiModeBtn = document.getElementById('aiModeBtn');
  var aiChatPanel = document.getElementById('aiChatPanel');
  var aiChatMessages = document.getElementById('aiChatMessages');
  var aiChatInput = document.getElementById('aiChatInput');
  var aiChatSendBtn = document.getElementById('aiChatSendBtn');
  var aiPlaceholder = document.getElementById('aiPlaceholder');
  var aiFooter = document.getElementById('aiFooter');
  // Context menu
  var contextMenu = document.getElementById('contextMenu');
  var ctxRename = document.getElementById('ctxRename');
  var ctxDelete = document.getElementById('ctxDelete');
  // Music panel
  var musicPanel = document.getElementById('musicPanel');
  var musicContent = document.getElementById('musicContent');
  var musicBtn = document.getElementById('musicBtn');
  var musicCloseBtn = document.getElementById('musicCloseBtn');
  var musicDragHandle = document.getElementById('musicDragHandle');
  var musicSearchInput = document.getElementById('musicSearchInput');
  var musicSearchBtn = document.getElementById('musicSearchBtn');
  var audioPlayer = document.getElementById('audioPlayer');
  var musicPlayBtn = document.getElementById('musicPlayBtn');
  var musicProgress = document.getElementById('musicProgress');
  var musicTime = document.getElementById('musicTime');
  var musicVolume = document.getElementById('musicVolume');
  var nowPlaying = document.getElementById('nowPlaying');
  var musicViz = document.getElementById('musicViz');
  var eqBass = document.getElementById('eqBass');
  var eqTreble = document.getElementById('eqTreble');
  var eqBassValEl = document.getElementById('eqBassVal');
  var eqTrebleValEl = document.getElementById('eqTrebleVal');
  var surroundBtn = document.getElementById('surroundBtn');
  // CD player
  var cdPlayer = document.getElementById('cdPlayer');
  var cdDisc = document.getElementById('cdDisc');
  var cdArt = document.getElementById('cdArt');
  var cdInfo = document.getElementById('cdInfo');
  var cdPlayBtn = document.getElementById('cdPlayBtn');
  var cdPrevBtn = document.getElementById('cdPrevBtn');
  var cdNextBtn = document.getElementById('cdNextBtn');
  var cdProgress = document.getElementById('cdProgress');
  var cdTime = document.getElementById('cdTime');
  var cdToggle = document.getElementById('cdToggle');
  var panelViz = document.getElementById('panelViz');

  // ─── Java class-to-import map ───────────────────────────────────────
  var JAVA_IMPORTS = {
    ArrayList:{pkg:'java.util.ArrayList',simple:'ArrayList'},LinkedList:{pkg:'java.util.LinkedList',simple:'LinkedList'},
    HashMap:{pkg:'java.util.HashMap',simple:'HashMap'},LinkedHashMap:{pkg:'java.util.LinkedHashMap',simple:'LinkedHashMap'},
    TreeMap:{pkg:'java.util.TreeMap',simple:'TreeMap'},HashSet:{pkg:'java.util.HashSet',simple:'HashSet'},
    TreeSet:{pkg:'java.util.TreeSet',simple:'TreeSet'},LinkedHashSet:{pkg:'java.util.LinkedHashSet',simple:'LinkedHashSet'},
    List:{pkg:'java.util.List',simple:'List'},Set:{pkg:'java.util.Set',simple:'Set'},Map:{pkg:'java.util.Map',simple:'Map'},
    Queue:{pkg:'java.util.Queue',simple:'Queue'},Deque:{pkg:'java.util.Deque',simple:'Deque'},
    Stack:{pkg:'java.util.Stack',simple:'Stack'},Vector:{pkg:'java.util.Vector',simple:'Vector'},
    PriorityQueue:{pkg:'java.util.PriorityQueue',simple:'PriorityQueue'},
    ArrayDeque:{pkg:'java.util.ArrayDeque',simple:'ArrayDeque'},
    Collections:{pkg:'java.util.Collections',simple:'Collections'},Arrays:{pkg:'java.util.Arrays',simple:'Arrays'},
    Iterator:{pkg:'java.util.Iterator',simple:'Iterator'},ListIterator:{pkg:'java.util.ListIterator',simple:'ListIterator'},
    Comparator:{pkg:'java.util.Comparator',simple:'Comparator'},Optional:{pkg:'java.util.Optional',simple:'Optional'},
    Random:{pkg:'java.util.Random',simple:'Random'},Scanner:{pkg:'java.util.Scanner',simple:'Scanner'},
    Date:{pkg:'java.util.Date',simple:'Date'},Calendar:{pkg:'java.util.Calendar',simple:'Calendar'},
    UUID:{pkg:'java.util.UUID',simple:'UUID'},Properties:{pkg:'java.util.Properties',simple:'Properties'},
    Timer:{pkg:'java.util.Timer',simple:'Timer'},TimerTask:{pkg:'java.util.TimerTask',simple:'TimerTask'},
    Stream:{pkg:'java.util.stream.Stream',simple:'Stream'},Collectors:{pkg:'java.util.stream.Collectors',simple:'Collectors'},
    Function:{pkg:'java.util.function.Function',simple:'Function'},Predicate:{pkg:'java.util.function.Predicate',simple:'Predicate'},
    Consumer:{pkg:'java.util.function.Consumer',simple:'Consumer'},Supplier:{pkg:'java.util.function.Supplier',simple:'Supplier'},
    File:{pkg:'java.io.File',simple:'File'},FileInputStream:{pkg:'java.io.FileInputStream',simple:'FileInputStream'},
    FileOutputStream:{pkg:'java.io.FileOutputStream',simple:'FileOutputStream'},
    FileReader:{pkg:'java.io.FileReader',simple:'FileReader'},FileWriter:{pkg:'java.io.FileWriter',simple:'FileWriter'},
    BufferedReader:{pkg:'java.io.BufferedReader',simple:'BufferedReader'},BufferedWriter:{pkg:'java.io.BufferedWriter',simple:'BufferedWriter'},
    InputStreamReader:{pkg:'java.io.InputStreamReader',simple:'InputStreamReader'},
    OutputStreamWriter:{pkg:'java.io.OutputStreamWriter',simple:'OutputStreamWriter'},
    PrintWriter:{pkg:'java.io.PrintWriter',simple:'PrintWriter'},IOException:{pkg:'java.io.IOException',simple:'IOException'},
    FileNotFoundException:{pkg:'java.io.FileNotFoundException',simple:'FileNotFoundException'},
    Serializable:{pkg:'java.io.Serializable',simple:'Serializable'},
    Path:{pkg:'java.nio.file.Path',simple:'Path'},Paths:{pkg:'java.nio.file.Paths',simple:'Paths'},Files:{pkg:'java.nio.file.Files',simple:'Files'},
    URL:{pkg:'java.net.URL',simple:'URL'},URLConnection:{pkg:'java.net.URLConnection',simple:'URLConnection'},
    HttpURLConnection:{pkg:'java.net.HttpURLConnection',simple:'HttpURLConnection'},
    Socket:{pkg:'java.net.Socket',simple:'Socket'},ServerSocket:{pkg:'java.net.ServerSocket',simple:'ServerSocket'},
    InetAddress:{pkg:'java.net.InetAddress',simple:'InetAddress'},URI:{pkg:'java.net.URI',simple:'URI'},
    LocalDate:{pkg:'java.time.LocalDate',simple:'LocalDate'},LocalTime:{pkg:'java.time.LocalTime',simple:'LocalTime'},
    LocalDateTime:{pkg:'java.time.LocalDateTime',simple:'LocalDateTime'},ZonedDateTime:{pkg:'java.time.ZonedDateTime',simple:'ZonedDateTime'},
    Instant:{pkg:'java.time.Instant',simple:'Instant'},Duration:{pkg:'java.time.Duration',simple:'Duration'},
    Period:{pkg:'java.time.Period',simple:'Period'},DateTimeFormatter:{pkg:'java.time.format.DateTimeFormatter',simple:'DateTimeFormatter'},
    BigInteger:{pkg:'java.math.BigInteger',simple:'BigInteger'},BigDecimal:{pkg:'java.math.BigDecimal',simple:'BigDecimal'},
    MathContext:{pkg:'java.math.MathContext',simple:'MathContext'},RoundingMode:{pkg:'java.math.RoundingMode',simple:'RoundingMode'},
    Connection:{pkg:'java.sql.Connection',simple:'Connection'},Statement:{pkg:'java.sql.Statement',simple:'Statement'},
    PreparedStatement:{pkg:'java.sql.PreparedStatement',simple:'PreparedStatement'},
    ResultSet:{pkg:'java.sql.ResultSet',simple:'ResultSet'},DriverManager:{pkg:'java.sql.DriverManager',simple:'DriverManager'},
    SQLException:{pkg:'java.sql.SQLException',simple:'SQLException'},
    Executors:{pkg:'java.util.concurrent.Executors',simple:'Executors'},ExecutorService:{pkg:'java.util.concurrent.ExecutorService',simple:'ExecutorService'},
    Future:{pkg:'java.util.concurrent.Future',simple:'Future'},Callable:{pkg:'java.util.concurrent.Callable',simple:'Callable'},
    CountDownLatch:{pkg:'java.util.concurrent.CountDownLatch',simple:'CountDownLatch'},
    AtomicInteger:{pkg:'java.util.concurrent.atomic.AtomicInteger',simple:'AtomicInteger'},
    JFrame:{pkg:'javax.swing.JFrame',simple:'JFrame'},JPanel:{pkg:'javax.swing.JPanel',simple:'JPanel'},
    JButton:{pkg:'javax.swing.JButton',simple:'JButton'},JLabel:{pkg:'javax.swing.JLabel',simple:'JLabel'},
    JTextField:{pkg:'javax.swing.JTextField',simple:'JTextField'},JTextArea:{pkg:'javax.swing.JTextArea',simple:'JTextArea'},
    SwingUtilities:{pkg:'javax.swing.SwingUtilities',simple:'SwingUtilities'},
    Color:{pkg:'java.awt.Color',simple:'Color'},Font:{pkg:'java.awt.Font',simple:'Font'},
    Dimension:{pkg:'java.awt.Dimension',simple:'Dimension'},Point:{pkg:'java.awt.Point',simple:'Point'},
    Rectangle:{pkg:'java.awt.Rectangle',simple:'Rectangle'},Graphics:{pkg:'java.awt.Graphics',simple:'Graphics'},
    BorderLayout:{pkg:'java.awt.BorderLayout',simple:'BorderLayout'},GridLayout:{pkg:'java.awt.GridLayout',simple:'GridLayout'},
    FlowLayout:{pkg:'java.awt.FlowLayout',simple:'FlowLayout'},ActionListener:{pkg:'java.awt.event.ActionListener',simple:'ActionListener'},
    KeyAdapter:{pkg:'java.awt.event.KeyAdapter',simple:'KeyAdapter'},MouseAdapter:{pkg:'java.awt.event.MouseAdapter',simple:'MouseAdapter'},
    StringBuilder:{pkg:'java.lang.StringBuilder',simple:'StringBuilder'},StringBuffer:{pkg:'java.lang.StringBuffer',simple:'StringBuffer'},
    Thread:{pkg:'java.lang.Thread',simple:'Thread'},Runnable:{pkg:'java.lang.Runnable',simple:'Runnable'},
    Exception:{pkg:'java.lang.Exception',simple:'Exception'},RuntimeException:{pkg:'java.lang.RuntimeException',simple:'RuntimeException'},
    Math:{pkg:'java.lang.Math',simple:'Math'},System:{pkg:'java.lang.System',simple:'System'},
    Comparable:{pkg:'java.lang.Comparable',simple:'Comparable'},Cloneable:{pkg:'java.lang.Cloneable',simple:'Cloneable'},
  };

  // ─── Helpers ────────────────────────────────────────────────────────
  function getFileIcon(name) {
    if (name.endsWith('.java')) return '\u2615';
    if (name.endsWith('.js')) return '\uD83D\uDFE8';
    if (name.endsWith('.ts')) return '\uD83D\uDD35';
    if (name.endsWith('.py')) return '\uD83D\uDC0D';
    if (name.endsWith('.md')) return '\uD83D\uDCC4';
    if (name.endsWith('.json')) return '\uD83D\uDCCB';
    if (name.endsWith('.html')) return '\uD83C\uDF10';
    if (name.endsWith('.css')) return '\uD83C\uDFA8';
    if (name.endsWith('.xml')) return '\uD83D\uDCD0';
    return '\uD83D\uDCC4';
  }
  function getLanguage(path) {
    if (path.endsWith('.java')) return 'java'; if (path.endsWith('.js')) return 'javascript';
    if (path.endsWith('.ts')) return 'typescript'; if (path.endsWith('.py')) return 'python';
    if (path.endsWith('.md')) return 'markdown'; if (path.endsWith('.json')) return 'json';
    if (path.endsWith('.html')) return 'html'; if (path.endsWith('.css')) return 'css';
    if (path.endsWith('.xml')) return 'xml'; return 'plaintext';
  }
  function getFileName(path) { var p = path.split('/'); return p[p.length-1] || path; }
  function escapeHtml(s) { var d = document.createElement('div'); d.appendChild(document.createTextNode(s)); return d.innerHTML; }

  // ─── Server persistence ─────────────────────────────────────────────
  function loadFilesFromServer(cb) {
    fetch('/api/files').then(function(r){return r.json();}).then(function(d){
      files=d||{}; Object.keys(files).forEach(function(p){
        var parts=p.split('/'),acc='';
        for(var i=1;i<parts.length;i++){acc+='/'+parts[i];if(i<parts.length-1)expandedFolders.add(acc);}
      }); if(cb)cb();
    }).catch(function(){files={};if(cb)cb();});
  }
  function saveFileToServer(p,n,c){fetch('/api/files',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({path:p,name:n,content:c})}).catch(function(){});}
  function createFileOnServer(p,n,c){return fetch('/api/files',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({path:p,name:n,content:c})}).then(function(r){return r.json();});}
  function deleteFileOnServer(p){fetch('/api/files?path='+encodeURIComponent(p),{method:'DELETE'}).catch(function(){});}

  var saveTimer=null;
  function scheduleSave(p,n,c){if(saveTimer)clearTimeout(saveTimer);saveTimer=setTimeout(function(){saveFileToServer(p,n,c);saveTimer=null;},500);}

  // ─── Build tree ─────────────────────────────────────────────────────
  function buildTree(paths) {
    var root={name:'',path:'',type:'folder',children:[]};
    paths.forEach(function(p){
      var parts=p.split('/').filter(Boolean),cur=root;
      for(var i=0;i<parts.length;i++){
        var isFile=i===parts.length-1&&!p.endsWith('/'),existing=null;
        for(var j=0;j<(cur.children||[]).length;j++){if(cur.children[j].name===parts[i]){existing=cur.children[j];break;}}
        if(existing){if(!isFile&&!existing.children)existing.children=[];cur=existing;}
        else{var n={name:parts[i],path:'/'+parts.slice(0,i+1).join('/'),type:isFile?'file':'folder',children:isFile?null:[]};cur.children.push(n);cur=n;}
      }
    });return root.children||[];
  }

  function renderTree(nodes,depth){
    if(depth===void 0)depth=0;var html='';
    nodes.forEach(function(n){
      var isF=n.type==='folder',isE=expandedFolders.has(n.path),isS=selectedFile===n.path,ind=12+depth*14;
      html+='<li class="tree__item"><div class="tree__item-header'+(isS?' tree__item-header--selected':'')+'" data-path="'+n.path+'" data-type="'+n.type+'" style="padding-left:'+ind+'px">';
      if(isF)html+='<span class="tree__arrow'+(isE?' tree__arrow--expanded':'')+'">&#9654;</span>';else html+='<span style="width:14px;display:inline-block"></span>';
      html+='<span class="tree__icon">'+(isF?(isE?'\uD83D\uDCC2':'\uD83D\uDCC1'):getFileIcon(n.name))+'</span><span class="tree__label">'+escapeHtml(n.name)+'</span>';
      if(!isF)html+='<span class="tree__delete" data-path="'+n.path+'" title="Delete">&times;</span>';
      html+='</div>';
      if(isF&&isE&&n.children&&n.children.length>0)html+='<ul class="tree__children">'+renderTree(n.children,depth+1)+'</ul>';
      html+='</li>';
    });return html;
  }
  function refreshTree(){fileTreeEl.innerHTML=renderTree(buildTree(Object.keys(files)));}

  function renderTabs(){
    var h='';
    openTabs.forEach(function(t){var a=activeTab===t.path;
      h+='<button class="editor-tab'+(a?' editor-tab--active':'')+'" data-path="'+t.path+'">';
      h+='<span class="editor-tab__icon">'+getFileIcon(t.name)+'</span><span>'+escapeHtml(t.name)+'</span>';
      h+='<span class="editor-tab__close" data-path="'+t.path+'">&times;</span></button>';
    });editorTabsEl.innerHTML=h;
  }

  function openFile(path){
    var ex=false;for(var i=0;i<openTabs.length;i++){if(openTabs[i].path===path){ex=true;break;}}
    if(!ex)openTabs.push({path:path,name:getFileName(path)});
    selectedFile=path;activeTab=path;renderTabs();refreshTree();loadEditor(path);updateTitle();
  }

  function closeTab(path){
    var idx=-1;for(var i=0;i<openTabs.length;i++){if(openTabs[i].path===path){idx=i;break;}}if(idx===-1)return;
    var nt=[];for(var j=0;j<openTabs.length;j++){if(openTabs[j].path!==path)nt.push(openTabs[j]);}openTabs=nt;
    if(path===activeTab){if(openTabs.length>0){var ni=Math.min(idx,openTabs.length-1);activeTab=openTabs[ni].path;selectedFile=openTabs[ni].path;}else{activeTab='';selectedFile='';}}
    renderTabs();refreshTree();if(activeTab)loadEditor(activeTab);else destroyEditor();updateTitle();
  }

  function updateTitle(){titleFileName.textContent=(activeTab?getFileName(activeTab):'No file open')+' \u2014 Code Runner';}
  function destroyEditor(){if(editor){editor.dispose();editor=null;}emptyState.style.display='flex';}

  function loadEditor(path){
    if(!path||!files[path]){destroyEditor();return;}
    emptyState.style.display='none';var lang=getLanguage(path),content=files[path];
    if(editor){var cm=editor.getModel();if(cm){if(cm.uri.toString()==='file://'+path)return;}editor.dispose();editor=null;}
    if(typeof monaco==='undefined'||!monaco.editor)return;
    var uri=monaco.Uri.parse('file://'+path);
    var model=monaco.editor.getModel(uri)||monaco.editor.createModel(content,lang,uri);
    editor=monaco.editor.create(editorContainer,{model:model,fontSize:14,fontFamily:"'JetBrains Mono', 'Fira Code', monospace",minimap:{enabled:false},scrollBeyondLastLine:false,lineNumbers:'on',renderLineHighlight:'all',cursorBlinking:'smooth',cursorSmoothCaretAnimation:'on',smoothScrolling:true,bracketPairColorization:{enabled:true},renderWhitespace:'selection',tabSize:2,automaticLayout:true,padding:{top:12},theme:'vs-dark'});
    editor.onDidChangeModelContent(function(){var m=editor.getModel();if(m){var p=m.uri.path,v=m.getValue();files[p]=v;scheduleSave(p,getFileName(p),v);}});
    editor.onDidChangeCursorPosition(function(e){cursorLine=e.position.lineNumber;cursorCol=e.position.column;var its=document.querySelectorAll('.status-bar__right .status-bar__item');if(its.length>0)its[0].textContent='Ln '+cursorLine+', Col '+cursorCol;});
  }

  function createFile(){
    var name=prompt('Enter file name (e.g. Hello.java):');if(!name||!name.trim())return;
    name=name.trim();var path='/workspace/'+name;if(!path.includes('.'))path+='.java';
    if(files[path]){alert('File already exists');return;}
    var dc='';if(path.endsWith('.java')){var cn=getFileName(path).replace('.java','');dc='public class '+cn+' {\n    public static void main(String[] args) {\n        System.out.println("Hello from '+cn+'!");\n    }\n}';}
    files[path]=dc;refreshTree();openFile(path);createFileOnServer(path,getFileName(path),dc);
  }

  function deleteFile(path){
    if(!confirm('Delete '+getFileName(path)+'?'))return;
    delete files[path];var nt=[];
    for(var i=0;i<openTabs.length;i++){if(openTabs[i].path!==path)nt.push(openTabs[i]);}openTabs=nt;
    if(activeTab===path){if(openTabs.length>0){activeTab=openTabs[0].path;selectedFile=openTabs[0].path;}else{activeTab='';selectedFile='';}}
    refreshTree();renderTabs();if(activeTab)loadEditor(activeTab);else destroyEditor();updateTitle();
    deleteFileOnServer(path);
  }

  function renameFile(path){
    var oldName=getFileName(path),newName=prompt('Rename "'+oldName+'" to:',oldName);
    if(!newName||!newName.trim()||newName.trim()===oldName)return;
    newName=newName.trim();var parts=path.split('/');parts[parts.length-1]=newName;var newPath=parts.join('/');
    if(files[newPath]){alert('File already exists: '+newName);return;}
    files[newPath]=files[path];delete files[path];
    // Update tabs
    for(var i=0;i<openTabs.length;i++){if(openTabs[i].path===path){openTabs[i].path=newPath;openTabs[i].name=newName;}}
    if(activeTab===path)activeTab=newPath;
    if(selectedFile===path)selectedFile=newPath;
    refreshTree();renderTabs();
    if(activeTab===newPath)loadEditor(newPath);
    // Server: create new, delete old
    createFileOnServer(newPath,newName,files[newPath]).then(function(){deleteFileOnServer(path);});
    updateTitle();
  }

  // ─── Context Menu ───────────────────────────────────────────────────
  function showContextMenu(x,y,path){
    ctxTargetPath=path;
    contextMenu.style.left=x+'px';contextMenu.style.top=y+'px';
    contextMenu.classList.add('context-menu--visible');
  }
  function hideContextMenu(){contextMenu.classList.remove('context-menu--visible');ctxTargetPath=null;}

  ctxRename.addEventListener('click',function(){if(ctxTargetPath){renameFile(ctxTargetPath);}hideContextMenu();});
  ctxDelete.addEventListener('click',function(){if(ctxTargetPath){deleteFile(ctxTargetPath);}hideContextMenu();});

  document.addEventListener('click',function(e){if(!contextMenu.contains(e.target))hideContextMenu();});

  // ─── AI Panel ───────────────────────────────────────────────────────
  function openAiPanel(){aiPanel.classList.remove('ai-panel--closed');aiPanel.style.width=aiPanelWidth+'px';aiBtn.classList.add('activity-bar__btn--active');aiPanelOpen=true;}
  function closeAiPanel(){aiPanel.classList.add('ai-panel--closed');aiBtn.classList.remove('activity-bar__btn--active');aiPanelOpen=false;}
  function toggleAiPanel(){if(aiPanelOpen)closeAiPanel();else{closeMusicPanel();openAiPanel();}}
  function showAiLoading(){aiContent.innerHTML='<div class="ai-panel__loading"><span class="spinner"></span><span>Analyzing code...</span></div>';aiStatus.textContent='Analyzing...';}
  function showAiResult(fb){if(typeof marked!=='undefined'&&marked.parse)aiContent.innerHTML=marked.parse(fb);else aiContent.innerHTML='<pre style="white-space:pre-wrap;font-size:13px;line-height:1.5;">'+escapeHtml(fb)+'</pre>';aiStatus.textContent='Done';if(!aiPanelOpen)openAiPanel();}
  function showAiError(msg){aiContent.innerHTML='<div style="color:#f48771;padding:12px;text-align:center;"><span style="font-size:24px;display:block;margin-bottom:8px;">&#9888;</span><div style="margin-bottom:12px;">'+escapeHtml(msg)+'</div><button onclick="('+retryAi.toString()+')()" style="background:var(--accent);color:#fff;border:none;padding:6px 16px;border-radius:4px;cursor:pointer;font-size:12px;font-family:var(--font-ui);">&#8635; Retry</button></div>';aiStatus.textContent='Error';}

  var lastAiCode='',lastAiOutput='',lastAiStdin='',lastAiError='';
  function retryAi(){
    if(!lastAiCode)return;showAiLoading();
    fetch('/api/ai-feedback',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:lastAiCode,output:lastAiOutput,stdin:lastAiStdin,error:lastAiError})})
    .then(function(r){return r.json();}).then(function(d){if(d.feedback)showAiResult(d.feedback);else showAiError('No feedback');}).catch(function(e){showAiError(e.message||'Network error');});
  }

  // ─── AI Chat ────────────────────────────────────────────────────────
  function toggleChatMode(){
    isChatMode=!isChatMode;
    aiModeBtn.classList.toggle('ai-panel__mode-btn--active',isChatMode);
    if(isChatMode){
      aiContent.style.display='none';
      aiFooter.style.display='none';
      aiChatPanel.style.display='flex';
      aiStatus.textContent='Chat mode';
      aiModeBtn.textContent='\u{1F4AC}';
    }else{
      aiContent.style.display='';
      aiFooter.style.display='';
      aiChatPanel.style.display='none';
      aiStatus.textContent='Feedback mode';
      aiModeBtn.textContent='\u{1F4CB}';
    }
  }

  function addChatMessage(role,content){
    var div=document.createElement('div');
    div.className='chat-msg chat-msg--'+role;
    var bubble=document.createElement('div');
    bubble.className='chat-msg__bubble';
    if(typeof marked!=='undefined'&&marked.parse&&role==='assistant'){
      bubble.innerHTML=marked.parse(content);
    }else{
      bubble.textContent=content;
    }
    div.appendChild(bubble);
    aiChatMessages.appendChild(div);
    aiChatMessages.scrollTop=aiChatMessages.scrollHeight;
  }

  function sendChatMessage(){
    var text=aiChatInput.value.trim();
    if(!text)return;
    aiChatInput.value='';
    addChatMessage('user',text);
    var loadingDiv=document.createElement('div');
    loadingDiv.className='chat-msg chat-msg--assistant chat-msg__loading';
    loadingDiv.id='chatLoading';
    var loadingBubble=document.createElement('div');
    loadingBubble.className='chat-msg__bubble';
    loadingBubble.textContent='Thinking...';
    loadingDiv.appendChild(loadingBubble);
    aiChatMessages.appendChild(loadingDiv);
    aiChatMessages.scrollTop=aiChatMessages.scrollHeight;
    aiChatSendBtn.disabled=true;
    var msgs=[];
    var chatMsgs=aiChatMessages.querySelectorAll('.chat-msg:not(.chat-msg__loading)');
    chatMsgs.forEach(function(m){
      var role=m.classList.contains('chat-msg--user')?'user':'assistant';
      var content=m.querySelector('.chat-msg__bubble').textContent||'';
      msgs.push({role:role,content:content});
    });
    fetch('/api/ai/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:msgs})})
    .then(function(r){return r.json();})
    .then(function(data){
      var loadingEl=document.getElementById('chatLoading');
      if(loadingEl)loadingEl.remove();
      if(data.reply)addChatMessage('assistant',data.reply);
      else addChatMessage('error','No response from AI');
    })
    .catch(function(err){
      var loadingEl=document.getElementById('chatLoading');
      if(loadingEl)loadingEl.remove();
      addChatMessage('error',err.message||'Network error');
    })
    .finally(function(){aiChatSendBtn.disabled=false;});
  }

  // ─── Music Player ───────────────────────────────────────────────────
  function openMusicPanel(){musicPanel.classList.remove('music-panel--closed');musicPanel.style.width=musicPanelWidth+'px';musicBtn.classList.add('activity-bar__btn--active');musicPanelOpen=true;}
  function closeMusicPanel(){musicPanel.classList.add('music-panel--closed');musicBtn.classList.remove('activity-bar__btn--active');musicPanelOpen=false;pauseTrack();stopVisualizer();stopBottomViz();}
  function toggleMusicPanel(){if(musicPanelOpen)closeMusicPanel();else{closeAiPanel();openMusicPanel();}}

  function searchMusic(query){
    if(!query.trim())return;
    musicContent.innerHTML='<div class="music-panel__loading"><span class="spinner"></span><span>Searching YouTube...</span></div>';
    fetch('/api/music/search?q='+encodeURIComponent(query))
    .then(function(r){return r.json();}).then(function(data){
      musicResults=(data.results||[]).map(function(r){return{...r,artistName:r.title||'Unknown',trackName:r.title||'Unknown',artworkUrl:r.thumbnail||'',videoId:r.videoId||''};});
      renderMusicResults();
    }).catch(function(){musicContent.innerHTML='<div class="music-panel__error">Search failed. Try again.</div>';});
  }

  function renderMusicResults(){
    if(!musicResults.length){musicContent.innerHTML='<div class="music-panel__placeholder"><span style="font-size:24px;">&#128256;</span><span>No results found</span></div>';return;}
    var h='';musicResults.forEach(function(r,i){
      var active=i===currentTrackIndex;
      h+='<div class="music-result'+(active?' music-result--active':'')+'" data-index="'+i+'">';
      if(r.artworkUrl)h+='<img class="music-result__art" src="'+r.artworkUrl+'" alt="" onerror="this.style.display=\'none\'"/>';
      else h+='<div class="music-result__art" style="display:flex;align-items:center;justify-content:center;font-size:18px;">&#127926;</div>';
      h+='<div class="music-result__info"><div class="music-result__track">'+escapeHtml(r.trackName||'Unknown')+'</div><div class="music-result__artist">YouTube</div></div>';
      h+='<button class="music-result__play" data-index="'+i+'">'+(active&&isPlaying?'&#9646;&#9646;':'&#9654;')+'</button>';
      h+='</div>';
    });musicContent.innerHTML=h;
  }

  // ─── Web Audio Graph ──────────────────────────────────────────────
  function initAudioGraph(){
    if(audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.8;

    bassFilter = audioCtx.createBiquadFilter();
    bassFilter.type = 'lowshelf';
    bassFilter.frequency.value = 200;
    bassFilter.gain.value = 0;

    trebleFilter = audioCtx.createBiquadFilter();
    trebleFilter.type = 'highshelf';
    trebleFilter.frequency.value = 3000;
    trebleFilter.gain.value = 0;

    surrDelay = audioCtx.createDelay(0.1);
    surrDelay.delayTime.value = 0.03;
    surrWetGain = audioCtx.createGain();
    surrWetGain.gain.value = 0;

    sourceNode = audioCtx.createMediaElementSource(audioPlayer);
    sourceNode.connect(bassFilter);
    bassFilter.connect(trebleFilter);
    trebleFilter.connect(analyser);
    analyser.connect(audioCtx.destination);
    trebleFilter.connect(surrDelay);
    surrDelay.connect(surrWetGain);
    surrWetGain.connect(audioCtx.destination);
  }

  function resumeAudioCtx(){
    if(audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  }

  // ─── Visualizer (time-based, no AnalyserNode needed) ─────────────
  function startVisualizer(){
    stopVisualizer();
    var canvas=musicViz,ctx=canvas.getContext('2d');
    canvas.width=canvas.clientWidth||336;canvas.height=canvas.clientHeight||60;
    var barCount=6;
    var freqs=[0,0,0,0,0,0];

    function draw(){
      vizAnimId=requestAnimationFrame(draw);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      var w=canvas.width/barCount-4;
      for(var i=0;i<barCount;i++){
        var target=isPlaying?0.1+Math.random()*0.9:0;
        freqs[i]+=(target-freqs[i])*0.15;
        var h=freqs[i]*canvas.height*0.9;
        var grad=ctx.createLinearGradient(0,canvas.height-h,0,canvas.height);
        grad.addColorStop(0,'#007acc');grad.addColorStop(1,'#1a8ad4');
        ctx.fillStyle=grad;
        ctx.shadowBlur=4;ctx.shadowColor='#007acc';
        var x=i*(w+4)+2;
        ctx.fillRect(x,canvas.height-h,w,h>0?Math.max(h,2):0);
        ctx.shadowBlur=0;
      }
    }
    draw();
  }

  function stopVisualizer(){if(vizAnimId){cancelAnimationFrame(vizAnimId);vizAnimId=null;}}

  function updateEq(){
    eqBassVal=parseFloat(eqBass.value);
    eqTrebleVal=parseFloat(eqTreble.value);
    eqBassValEl.textContent=eqBassVal+'dB';
    eqTrebleValEl.textContent=eqTrebleVal+'dB';
    if(bassFilter) bassFilter.gain.value = eqBassVal;
    if(trebleFilter) trebleFilter.gain.value = eqTrebleVal;
  }

  function toggleSurround(){
    surroundEnabled=!surroundEnabled;
    surroundBtn.classList.toggle('music-panel__surround-btn--active',surroundEnabled);
    if(surrWetGain) surrWetGain.gain.value = surroundEnabled ? 0.35 : 0;
  }

  // ─── Bottom panel audio visualizer ────────────────────────────────
  function startBottomViz(){
    stopBottomViz();
    if(!panelViz || !analyser) return;
    var canvas = panelViz;
    var ctx = canvas.getContext('2d');
    var parent = canvas.parentElement;
    var bufLen = analyser.frequencyBinCount;
    var data = new Uint8Array(bufLen);
    var bars = 14;
    var half = Math.floor(bars / 2);

    function resize(){
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw(){
      bottomVizId = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(data);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var barW = (canvas.width / bars) * 0.7;
      var gap = (canvas.width / bars) * 0.3;
      var maxH = canvas.height - 4;

      for(var i = 0; i < half; i++){
        var lIdx = i;
        var rIdx = half + i;
        if(rIdx >= bufLen) break;

        var lVal = data[lIdx] / 255;
        var rVal = data[rIdx] / 255;

        // Left side: bars grow from left edge rightward
        var lx = i * (barW + gap) + gap/2;
        var lh = lVal * maxH;
        ctx.fillStyle = '#007acc';
        ctx.fillRect(lx, canvas.height - 2 - lh, barW, lh);

        // Right side: bars grow from right edge leftward
        var rx = canvas.width - (i + 1) * (barW + gap) + gap/2;
        var rh = rVal * maxH;
        ctx.fillRect(rx, canvas.height - 2 - rh, barW, rh);
      }

      // Center gap indicator
      ctx.fillStyle = '#333';
      ctx.fillRect(canvas.width/2 - 1, canvas.height - 6, 2, 4);
    }
    draw();
  }

  function stopBottomViz(){
    if(bottomVizId){ cancelAnimationFrame(bottomVizId); bottomVizId = null; }
    if(panelViz){
      var ctx = panelViz.getContext('2d');
      if(ctx) ctx.clearRect(0, 0, panelViz.width, panelViz.height);
    }
  }

  // ─── CD Player helpers ──────────────────────────────────────────────
  function showCdPlayer(){cdPlayer.classList.remove('cd-player--hidden');}

  function hideCdPlayer(){cdPlayer.classList.add('cd-player--hidden');}

  function setCdLoading(loading){
    cdDisc.classList.toggle('cd-player__disc--loading',loading);
    if(loading){
      cdPlayBtn.textContent='\u23F3';
      cdInfo.textContent='Loading...';
    }
  }

  function updateCdPlayer(){
    if(currentTrackIndex<0||!musicResults[currentTrackIndex]){hideCdPlayer();return;}
    var track=musicResults[currentTrackIndex];
    var art=track.artworkUrl||'';
    cdArt.src=art;
    cdArt.onerror=function(){cdArt.src='';};
    cdInfo.textContent=track.trackName||'Unknown';
    showCdPlayer();
    setCdSpinning(isPlaying);
  }

  function setCdSpinning(spinning){
    cdDisc.classList.remove('cd-player__disc--loading');
    cdDisc.classList.toggle('cd-player__disc--playing',spinning);
    cdPlayBtn.textContent=spinning?'\u23F8':'\u25B6';
  }

  function toggleCdPlayer(){
    cdPlayer.classList.toggle('cd-player--min');
  }

  // ─── Music playback ─────────────────────────────────────────────────
  function playTrack(index){
    if(index<0||index>=musicResults.length)return;
    currentTrackIndex=index;var track=musicResults[index];
    if(!track.videoId)return;
    if(isPlaying){try{audioPlayer.pause();}catch(e){}
    }else{stopVisualizer();stopBottomViz();}
    nowPlaying.innerHTML='<div class="music-panel__loading"><span class="spinner"></span><span>Downloading...</span></div>';
    setCdLoading(true);
    showCdPlayer();
    fetch('/api/music/download?id='+track.videoId, {method:'POST'})
    .then(function(r){return r.json();}).then(function(data){
      if(data.status==='ok'&&data.localUrl){
        nowPlaying.innerHTML='<div class="music-panel__loading"><span class="spinner"></span><span>Buffering...</span></div>';
        initAudioGraph();
        audioPlayer.src=data.localUrl;
        audioPlayer.oncanplay=function(){
          resumeAudioCtx();
          startVisualizer();
          startBottomViz();
          audioPlayer.play().then(function(){
            isPlaying=true;
            var title=track.trackName||'Unknown';
            var art=track.artworkUrl||'';
            nowPlaying.innerHTML='<img class="music-panel__np-art" src="'+art+'" alt="" onerror="this.style.display=\'none\'"/><div class="music-panel__np-info"><span class="music-panel__np-track">'+escapeHtml(title)+'</span></div>';
            musicPlayBtn.textContent='\u23F8';renderMusicResults();updateMusicProgress();
            updateCdPlayer();
          }).catch(function(e){
            isPlaying=false;showMusicError('Tap play: '+e.message);
          });
          audioPlayer.oncanplay=null;
        };
        audioPlayer.load();
      } else {
        console.error('Download API response:',data);
        showMusicError('Failed: '+(data.error||'unknown error'));
      }
    }).catch(function(e){showMusicError('Download failed: '+e.message);});
  }

  function showMusicError(msg){nowPlaying.innerHTML='<div class="music-panel__np-info" style="color:#f48771;">'+escapeHtml(msg)+'</div>';hideCdPlayer();}

  function pauseTrack(){
    try{audioPlayer.pause();}catch(e){}
    isPlaying=false;musicPlayBtn.textContent='\u25B6';renderMusicResults();setCdSpinning(false);stopBottomViz();
  }

  function togglePlay(){
    if(currentTrackIndex<0)return;
    if(isPlaying)pauseTrack();
    else{
      initAudioGraph();
      resumeAudioCtx();
      startVisualizer();
      startBottomViz();
      audioPlayer.play().then(function(){isPlaying=true;musicPlayBtn.textContent='\u23F8';renderMusicResults();setCdSpinning(true);}).catch(function(){console.warn('Play rejected (autoplay policy)');});
    }
  }

  function updateMusicProgress(){
    if(!audioPlayer.duration){musicTime.textContent='0:00 / 0:00';cdTime.textContent='0:00 / 0:00';return;}
    var cur=audioPlayer.currentTime,dur=audioPlayer.duration;
    var pct=(cur/dur*100)||0;
    musicProgress.value=pct;
    cdProgress.value=pct;
    var txt=fmtTime(cur)+' / '+fmtTime(dur);
    musicTime.textContent=txt;
    cdTime.textContent=txt;
  }

  function fmtTime(s){var m=Math.floor(s/60),sec=Math.floor(s%60);return m+':'+(sec<10?'0':'')+sec;}

  // ─── CD Player event listeners ─────────────────────────────────────
  cdToggle.addEventListener('click',toggleCdPlayer);

  cdPlayBtn.addEventListener('click',togglePlay);

  cdPrevBtn.addEventListener('click',function(){
    if(musicResults.length<1)return;
    var idx=currentTrackIndex-1;
    if(idx<0)idx=musicResults.length-1;
    playTrack(idx);
  });

  cdNextBtn.addEventListener('click',function(){
    if(musicResults.length<1)return;
    var idx=currentTrackIndex+1;
    if(idx>=musicResults.length)idx=0;
    playTrack(idx);
  });

  cdProgress.addEventListener('input',function(){
    if(audioPlayer.duration){audioPlayer.currentTime=(cdProgress.value/100)*audioPlayer.duration;}
  });

  // ─── Music event listeners ──────────────────────────────────────────
  musicSearchBtn.addEventListener('click',function(){searchMusic(musicSearchInput.value);});
  musicSearchInput.addEventListener('keydown',function(e){if(e.key==='Enter')searchMusic(musicSearchInput.value);});

  musicContent.addEventListener('click',function(e){
    var btn=e.target.closest('.music-result__play');var item=e.target.closest('.music-result');
    if(btn){var idx=parseInt(btn.getAttribute('data-index'));if(idx===currentTrackIndex&&isPlaying)pauseTrack();else playTrack(idx);return;}
    if(item){var idx2=parseInt(item.getAttribute('data-index'));playTrack(idx2);}
  });

  audioPlayer.addEventListener('timeupdate',updateMusicProgress);
  audioPlayer.addEventListener('ended',function(){
    isPlaying=false;musicPlayBtn.textContent='\u25B6';renderMusicResults();setCdSpinning(false);
    stopVisualizer();stopBottomViz();
    var track=musicResults[currentTrackIndex];
    if(track&&track.videoId){
      fetch('/api/music/'+track.videoId,{method:'DELETE'}).catch(function(){});
    }
  });
  audioPlayer.addEventListener('error',function(){
    isPlaying=false;musicPlayBtn.textContent='\u25B6';renderMusicResults();setCdSpinning(false);
    stopVisualizer();stopBottomViz();
    showMusicError('Playback failed - file may be corrupted or unsupported');
  });
  musicProgress.addEventListener('input',function(){if(audioPlayer.duration){audioPlayer.currentTime=(musicProgress.value/100)*audioPlayer.duration;}});
  musicVolume.addEventListener('input',function(){if(audioPlayer){audioPlayer.volume=parseFloat(musicVolume.value);}});
  musicPlayBtn.addEventListener('click',togglePlay);
  eqBass.addEventListener('input',updateEq);
  eqTreble.addEventListener('input',updateEq);
  surroundBtn.addEventListener('click',toggleSurround);



  // ─── Run code ───────────────────────────────────────────────────────
  function runCode(){
    if(running||!activeTab)return;var code=files[activeTab];if(!code)return;
    running=true;runBtn.disabled=true;runBtn.innerHTML='<span class="spinner"></span><span>Running...</span>';
    outputEl.textContent='Running...';outputEl.style.color='var(--text-muted)';
    var stdin=stdinInput.value||'';
    fetch('/api/execute',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({language:'java',code:code,stdin:stdin})})
    .then(function(r){return r.json();}).then(function(data){
      var out=data.output||'(no output)';outputEl.textContent=out;
      if(out.startsWith('Error'))outputEl.style.color='#f48771';else outputEl.style.color='#89d185';
      lastAiCode=code;lastAiOutput=out;lastAiStdin=stdin;lastAiError=out.startsWith('Error')?out:'';
      showAiLoading();
      fetch('/api/ai-feedback',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:lastAiCode,output:lastAiOutput,stdin:lastAiStdin,error:lastAiError})})
      .then(function(r){return r.json();}).then(function(d){if(d.feedback)showAiResult(d.feedback);else showAiError('No feedback');})
      .catch(function(e){showAiError(e.message||'Network error');});
    }).catch(function(){outputEl.textContent='Network error';outputEl.style.color='#f48771';})
    .finally(function(){running=false;runBtn.disabled=false;runBtn.innerHTML='<span>\u25B6</span><span>Run</span>';});
  }

  // ─── Drag resize ────────────────────────────────────────────────────
  var dragState=null;
  function startDrag(e,panel,handle,widthRef,minW,maxW){
    dragState={panel:panel,handle:handle,startX:e.clientX||e.pageX,startW:panel.offsetWidth,widthRef:widthRef,minW:minW,maxW:maxW};
    handle.classList.add('ai-panel__drag--active');document.body.style.cursor='col-resize';document.body.style.userSelect='none';e.preventDefault();
  }
  document.addEventListener('mousemove',function(e){
    if(!dragState)return;var ds=dragState,delta=ds.startX-(e.clientX||e.pageX),nw=ds.startW+delta;
    if(nw<ds.minW)nw=ds.minW;if(nw>ds.maxW)nw=ds.maxW;
    ds.panel.style.width=nw+'px';ds.widthRef.set(nw);
  });
  document.addEventListener('mouseup',function(){
    if(!dragState)return;dragState.handle.classList.remove('ai-panel__drag--active');
    document.body.style.cursor='';document.body.style.userSelect='';dragState=null;
  });

  aiDragHandle.addEventListener('mousedown',function(e){
    startDrag(e,aiPanel,aiDragHandle,{set:function(v){aiPanelWidth=v;}},200,800);
  });
  musicDragHandle.addEventListener('mousedown',function(e){
    startDrag(e,musicPanel,musicDragHandle,{set:function(v){musicPanelWidth=v;}},200,600);
  });

  // ─── Event listeners ────────────────────────────────────────────────
  fileTreeEl.addEventListener('click',function(e){
    var t=e.target;if(t.classList.contains('tree__delete')){e.stopPropagation();var dp=t.getAttribute('data-path');if(dp)deleteFile(dp);return;}
    var h=t.closest('.tree__item-header');if(!h)return;var p=h.getAttribute('data-path'),ty=h.getAttribute('data-type');
    if(ty==='folder'){if(expandedFolders.has(p))expandedFolders.delete(p);else expandedFolders.add(p);refreshTree();}else openFile(p);
  });

  fileTreeEl.addEventListener('contextmenu',function(e){
    var h=e.target.closest('.tree__item-header');if(!h||h.getAttribute('data-type')==='folder')return;
    e.preventDefault();showContextMenu(e.clientX,e.clientY,h.getAttribute('data-path'));
  });

  editorTabsEl.addEventListener('click',function(e){
    var t=e.target;if(t.classList.contains('editor-tab__close')){e.stopPropagation();var cp=t.getAttribute('data-path');if(cp)closeTab(cp);return;}
    var tb=t.closest('.editor-tab');if(!tb)return;var tp=tb.getAttribute('data-path');if(tp&&tp!==activeTab){activeTab=tp;selectedFile=tp;renderTabs();refreshTree();loadEditor(tp);updateTitle();}
  });

  runBtn.addEventListener('click',runCode);
  clearOutputBtn.addEventListener('click',function(){outputEl.textContent='\u25B6 Click "Run" to execute your Java code';outputEl.style.color='';});
  newFileBtn.addEventListener('click',createFile);
  collapseBtn.addEventListener('click',function(){expandedFolders.clear();refreshTree();});
  aiBtn.addEventListener('click',toggleAiPanel);
  aiCloseBtn.addEventListener('click',closeAiPanel);
  aiCloseFooterBtn.addEventListener('click',closeAiPanel);
  aiModeBtn.addEventListener('click',toggleChatMode);
  aiChatSendBtn.addEventListener('click',sendChatMessage);
  aiChatInput.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChatMessage();}});
  musicBtn.addEventListener('click',toggleMusicPanel);
  musicCloseBtn.addEventListener('click',closeMusicPanel);

  document.addEventListener('keydown',function(e){if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();runCode();}});

  // ─── Monaco CompletionItemProvider ──────────────────────────────────
  function registerJavaCompletions(){
    if(typeof monaco==='undefined'||!monaco.languages)return;
    monaco.languages.registerCompletionItemProvider('java',{
      triggerCharacters:['.'],
      provideCompletionItems:function(model,pos){
        var tu=model.getValueInRange({startLineNumber:pos.lineNumber,startColumn:1,endLineNumber:pos.lineNumber,endColumn:pos.column});
        var wm=tu.match(/([A-Za-z_]\w*)$/);if(!wm)return{suggestions:[]};
        var prefix=wm[1],fullText=model.getValue(),sugs=[],seen={};
        Object.keys(JAVA_IMPORTS).forEach(function(cn){
          if(cn.toLowerCase().indexOf(prefix.toLowerCase())===-1)return;if(seen[cn])return;seen[cn]=true;
          var info=JAVA_IMPORTS[cn],hasI=fullText.indexOf('import '+info.pkg+';')!==-1;
          sugs.push({label:cn+' \u2014 '+info.pkg,kind:monaco.languages.CompletionItemKind.Class,insertText:cn,detail:hasI?'imported':info.pkg,
            documentation:hasI?'Already imported':'Add import: import '+info.pkg+';'});
        });return{suggestions:sugs};
      }
    });
  }

  // ─── Initialize ─────────────────────────────────────────────────────
  function initMonaco(){
    require.config({paths:{vs:'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs'}});
    require(['vs/editor/editor.main'],function(){
      monaco.editor.defineTheme('ide-dark',{base:'vs-dark',inherit:true,rules:[],colors:{'editor.background':'#1e1e1e','editor.foreground':'#d4d4d4','editor.lineHighlightBackground':'#2a2d2e','editor.selectionBackground':'#264f78','editorCursor.foreground':'#007acc','editorLineNumber.foreground':'#858585'}});
      monaco.editor.setTheme('ide-dark');registerJavaCompletions();
      loadFilesFromServer(function(){
        var paths=Object.keys(files);
        if(paths.length>0){openTabs=[{path:paths[0],name:getFileName(paths[0])}];activeTab=paths[0];selectedFile=paths[0];}
        refreshTree();renderTabs();if(activeTab)loadEditor(activeTab);updateTitle();
      });
    });
  }

  if(typeof require==='undefined'){var cl=setInterval(function(){if(typeof require!=='undefined'){clearInterval(cl);initMonaco();}},100);}else initMonaco();
})();
